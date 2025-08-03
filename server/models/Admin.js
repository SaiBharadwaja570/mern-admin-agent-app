const mongoose = require('mongoose')

// Define the schema for Admin model
const adminSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Export the Admin model
module.exports = mongoose.model('Admin', adminSchema)