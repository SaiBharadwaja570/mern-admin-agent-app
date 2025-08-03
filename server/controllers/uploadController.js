const csv = require('csv-parser')
const xlsx = require('xlsx')

const Agent = require('../models/Agent')
const Task = require('../models/Task')

// Handles file upload and task distribution among agents
const uploadAndDistribute = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        const buffer = req.file.buffer;
        const fileType = req.file.mimetype;
        let tasks = []

        // Parse file based on type
        if (fileType === 'text/csv') {
            tasks = await parseCSV(buffer)
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                   fileType === 'application/vnd.ms-excel') {
            const workbook = xlsx.read(buffer, { type: 'buffer' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            tasks = xlsx.utils.sheet_to_json(sheet);
        } else {
            return res.status(400).json({ message: 'Unsupported file type. Please upload CSV or Excel files.' })
        }

        if (!tasks || tasks.length === 0) {
            return res.status(400).json({ message: 'No valid data found in the file' })
        }

        // Normalize and filter tasks
        tasks = tasks.map(item => ({
            firstName: item.FirstName || item.firstName || item['First Name'] || '',
            phone: item.Phone || item.phone || item['Phone Number'] || '',
            notes: item.Notes || item.notes || item['Notes'] || ''
        })).filter(task => task.firstName || task.phone); 

        if (tasks.length === 0) {
            return res.status(400).json({ message: 'No valid tasks found after processing' })
        }

        const agents = await Agent.find();
        
        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents available for task distribution' })
        }

        const numAgents = agents.length;
        const distributed = Array.from({ length: numAgents }, () => []);

        // Distribute tasks among agents
        tasks.forEach((task, index) => {
            const agentIndex = index % numAgents;
            distributed[agentIndex].push(task);
        });

        // Save tasks to database and prepare summary
        let totalTasksCreated = 0;
        const distributionSummary = [];

        for (let i = 0; i < numAgents; i++) {
            const agent = agents[i];
            const agentTasks = distributed[i];
            
            if (agentTasks.length > 0) {
                const createdTasks = await Task.insertMany(
                    agentTasks.map(task => ({
                        agentId: agent._id,
                        ...task
                    }))
                );
                
                totalTasksCreated += createdTasks.length;
                distributionSummary.push({
                    agentName: agent.name,
                    agentId: agent._id,
                    tasksAssigned: agentTasks.length
                });
            } 
        }

        res.status(200).json({ 
            message: 'Tasks uploaded and distributed successfully',
            summary: {
                totalTasks: tasks.length,
                totalAgents: numAgents,
                tasksCreated: totalTasksCreated,
                distribution: distributionSummary
            }
        });

    } catch (err) {
        console.error('Upload and distribution error:', err);
        res.status(500).json({ 
            message: 'Upload failed', 
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }
}

// Helper function for parsing CSV buffer
const parseCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const stream = require('stream');
        const readable = new stream.Readable();
        readable._read = () => {};
        readable.push(buffer);
        readable.push(null);

        readable
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

module.exports = { uploadAndDistribute }