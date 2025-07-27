const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Create a new request
router.post('/', async (req, res) => {
  try {
    const request = new Request({
      foodItem: req.body.foodItem,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      message: req.body.message,
      status: 'pending'
    });

    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('foodItem')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('foodItem');
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update request status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status;
    await request.save();
    res.json(request);
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 