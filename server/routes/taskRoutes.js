const express = require('express');
const router = express.Router();
const { getTasksByAdmin } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getTasksByAdmin);

module.exports = router;
