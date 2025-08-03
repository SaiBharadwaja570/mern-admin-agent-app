const express = require('express')
const Task = require('../models/Task.js')

const router = express.Router()


router.get('/agents/:id', async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.id })
        return res.json( tasks )
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
})

module.exports = router