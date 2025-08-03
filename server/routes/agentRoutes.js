const express = require('express');
const router = express.Router();
const { addAgent, getAllAgents, getAllAgentsWithTasks } = require('../controllers/agentController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, addAgent);        // Add agent
router.get('/', verifyToken, getAllAgents);     // View all agents
router.get('/with-tasks', verifyToken, getAllAgentsWithTasks) // get all agents with tasks

module.exports = router;
