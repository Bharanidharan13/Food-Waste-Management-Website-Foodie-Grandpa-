const express = require('express');
const router = express.Router();
const FoodDonation = require('../models/FoodDonation');

// Get all food donations
router.get('/', async (req, res) => {
  try {
    const query = {};
    
    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    const donations = await FoodDonation.find(query).sort({ createdAt: -1 });
    console.log(`Found ${donations.length} donations with query:`, query);
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// Create a new food donation
router.post('/', async (req, res) => {
  try {
    console.log('Received donation data:', req.body);

    // Validate required fields
    const requiredFields = ['name', 'category', 'quantity', 'location', 'address', 'donatedBy', 'donorInfo'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Create the donation object
    const donationData = {
      name: req.body.name,
      description: req.body.description || '',
      image: req.body.image,
      category: req.body.category,
      quantity: req.body.quantity,
      expiryDate: req.body.expiryDate || 'Not specified',
      location: req.body.location,
      address: req.body.address,
      status: 'available',
      donatedBy: req.body.donatedBy,
      donorInfo: {
        name: req.body.donorInfo.name,
        phone: req.body.donorInfo.phone,
        organization: req.body.donorInfo.organization
      }
    };

    // Create and save the donation
    const donation = new FoodDonation(donationData);
    console.log('Creating new donation with data:', donationData);
    
    const newDonation = await donation.save();
    console.log('Successfully created donation:', newDonation);
    
    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error creating donation:', error);
    
    if (error.name === 'ValidationError') {
      console.error('Validation error details:', error.errors);
      return res.status(400).json({ 
        message: 'Validation error', 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to create donation',
      error: error.message 
    });
  }
});

// Get a specific donation
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching donation:', req.params.id);
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation) {
      console.log('Donation not found:', req.params.id);
      return res.status(404).json({ message: 'Donation not found' });
    }
    console.log('Found donation:', donation);
    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Failed to fetch donation' });
  }
});

// Update a donation's status
router.patch('/:id', async (req, res) => {
  try {
    console.log('Updating donation:', req.params.id, 'with data:', req.body);
    const donation = await FoodDonation.findById(req.params.id);
    if (!donation) {
      console.log('Donation not found:', req.params.id);
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    if (req.body.status) {
      if (!['available', 'reserved', 'completed'].includes(req.body.status)) {
        console.error('Invalid status value:', req.body.status);
        return res.status(400).json({ message: 'Invalid status value' });
      }
      donation.status = req.body.status;
    }
    
    const updatedDonation = await donation.save();
    console.log('Successfully updated donation:', updatedDonation);
    res.json(updatedDonation);
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Failed to update donation' });
  }
});

module.exports = router; 