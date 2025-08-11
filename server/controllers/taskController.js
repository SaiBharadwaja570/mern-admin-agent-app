const Task = require("../models/Task");

const getTasksByAdmin = async (req, res) => {
  try {
    const tasks = await Task.find({ adminId: req.adminId }).populate("agentId", "name email phone");

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching admin tasks:", err);
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

module.exports = { getTasksByAdmin };
