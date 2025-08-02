const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.addAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, phone, password: hashedPassword });
    await agent.save();

    res.status(201).json({ message: 'Agent created successfully', agent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch agents' });
  }
};
