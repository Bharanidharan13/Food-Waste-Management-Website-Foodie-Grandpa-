const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Temporary route handlers until we implement the full functionality
router.get('/', (req, res) => {
  res.json({ message: 'Food routes working' });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Protected food route' });
});

module.exports = router; 