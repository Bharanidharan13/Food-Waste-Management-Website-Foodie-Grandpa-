const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const auth = require('../middleware/authMiddleware');

// Create food item
router.post('/', auth, async (req, res) => {
  const food = new FoodItem({ ...req.body, user: req.userId });
  await food.save();
  res.status(201).json(food);
});

// Get all food items
router.get('/', async (req, res) => {
  const items = await FoodItem.find().populate('user');
  res.json(items);
});

// ✅ Add this line at the end
module.exports = router;
