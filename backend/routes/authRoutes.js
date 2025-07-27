const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Debug route - temporary
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected routes
router.get('/me', protect, getMe);

module.exports = router; 