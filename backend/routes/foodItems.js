const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const auth = require('../middleware/auth');

// POST /api/food-items - Create a new food donation
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating new food donation:', req.body);
    
    const foodItem = new FoodItem({
      ...req.body,
      donatedBy: {
        ...req.body.donatedBy,
        userId: req.user._id
      }
    });

    await foodItem.save();
    console.log('Food donation created successfully:', foodItem);
    res.status(201).json(foodItem);
  } catch (error) {
    console.error('Error creating food donation:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
});

// GET /api/food-items - Get all available food items
router.get('/', async (req, res) => {
  try {
    console.log('Fetching food items with query:', req.query);
    
    const query = { status: 'available' };
    
    if (req.query.location) {
      query.location = new RegExp(req.query.location, 'i');
    }
    
    if (req.query.category) {
      query.category = req.query.category;
    }

    console.log('Final query:', query);
    
    const foodItems = await FoodItem.find(query)
      .sort({ createdAt: -1 })
      .populate('donatedBy.userId', 'name organization');
      
    console.log(`Found ${foodItems.length} food items`);
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/food-items/my-donations - Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    console.log('Fetching donations for user:', req.user._id);
    
    const foodItems = await FoodItem.find({
      'donatedBy.userId': req.user._id
    }).sort({ createdAt: -1 });
    
    console.log(`Found ${foodItems.length} donations`);
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/food-items/:id - Get a specific food item
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching food item:', req.params.id);
    
    const foodItem = await FoodItem.findById(req.params.id)
      .populate('donatedBy.userId', 'name organization');
      
    if (!foodItem) {
      console.log('Food item not found:', req.params.id);
      return res.status(404).json({ error: 'Food item not found' });
    }
    
    res.json(foodItem);
  } catch (error) {
    console.error('Error fetching food item:', error);
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/food-items/:id - Update a food item
router.patch('/:id', auth, async (req, res) => {
  try {
    console.log('Updating food item:', req.params.id);
    console.log('Update data:', req.body);
    
    const foodItem = await FoodItem.findOne({
      _id: req.params.id,
      'donatedBy.userId': req.user._id
    });

    if (!foodItem) {
      console.log('Food item not found or unauthorized');
      return res.status(404).json({ error: 'Food item not found' });
    }

    const allowedUpdates = ['name', 'description', 'category', 'quantity', 'expiryDate', 'image', 'location', 'address', 'status'];
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        foodItem[key] = req.body[key];
      }
    });

    await foodItem.save();
    console.log('Food item updated successfully');
    res.json(foodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/food-items/:id - Delete a food item
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting food item:', req.params.id);
    
    const foodItem = await FoodItem.findOneAndDelete({
      _id: req.params.id,
      'donatedBy.userId': req.user._id
    });

    if (!foodItem) {
      console.log('Food item not found or unauthorized');
      return res.status(404).json({ error: 'Food item not found' });
    }

    console.log('Food item deleted successfully');
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/food-items/:id/status - Update food item status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    console.log('Updating food item status:', req.params.id);
    console.log('New status:', req.body.status);
    
    const { status } = req.body;
    if (!['available', 'reserved', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      console.log('Food item not found:', req.params.id);
      return res.status(404).json({ error: 'Food item not found' });
    }

    foodItem.status = status;
    await foodItem.save();
    console.log('Status updated successfully');
    res.json(foodItem);
  } catch (error) {
    console.error('Error updating food item status:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 