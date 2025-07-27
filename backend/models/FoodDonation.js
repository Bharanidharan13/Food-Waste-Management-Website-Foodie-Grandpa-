const mongoose = require('mongoose');

const foodDonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Cooked Meals",
      "Fresh Produce",
      "Packaged Food",
      "Dairy & Eggs",
      "Bakery Items",
      "Beverages",
      "Grains & Rice",
      "Snacks"
    ]
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  },
  expiryDate: {
    type: String,
    default: 'Not specified'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'completed'],
    default: 'available'
  },
  donatedBy: {
    type: String,
    required: true,
    trim: true
  },
  donorInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    organization: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);

module.exports = FoodDonation; 