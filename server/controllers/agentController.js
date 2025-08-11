const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const Task = require('../models/Task')

// A function to add agents 
exports.addAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await Agent.findOne({ email, adminId: req.adminId }); // Confirming whether agents already exist by fetching data 
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // Using bycryptjs to hash and protect the password
    const agent = new Agent({ name, email, phone, password: hashedPassword, adminId: req.adminId }); // Creation of new agents
    await agent.save();

    res.status(201).json({ message: 'Agent created successfully', agent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ adminId: req.adminId }).select('-password'); // Gets all the agents
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch agents' });
  }
};

exports.getAllAgentsWithTasks = async (req, res) => {
  try {
    const agents = await Agent.find({ adminId: req.adminId }); // Get all agents

    // Get tasks for each agent
    const agentsWithTasks = await Promise.all(
      agents.map(async (agent) => {
        const tasks = await Task.find({ agentId: agent._id, adminId: req.adminId });
        return {
          ...agent._doc,
          tasks,
        };
      })
    );

    res.json(agentsWithTasks);
  } catch (err) {
    console.error("Error fetching agents and tasks:", err);
    res.status(500).json({ error: "Failed to fetch agents and tasks" });
  }
};
