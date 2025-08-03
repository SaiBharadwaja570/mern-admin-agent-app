const express = require('express');
const router = express.Router();
const { login, registerAdmin } = require('../controllers/authController');

router.post('/login', login); // for login
router.post('/register', registerAdmin) // for registration

module.exports = router;
