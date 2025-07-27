const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
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
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  donatedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
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
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'completed'],
    default: 'available'
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
foodItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
