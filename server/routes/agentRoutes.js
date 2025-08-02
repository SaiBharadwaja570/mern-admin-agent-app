const express = require('express');
const router = express.Router();
const { addAgent, getAllAgents } = require('../controllers/agentController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, addAgent);        // Add agent
router.get('/', verifyToken, getAllAgents);     // View all agents

module.exports = router;
