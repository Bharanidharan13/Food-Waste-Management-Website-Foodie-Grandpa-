const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide food name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide food description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide food price']
  },
  image: {
    type: String,
    required: [true, 'Please provide food image']
  },
  category: {
    type: String,
    required: [true, 'Please provide food category'],
    enum: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages']
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating before saving
foodSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length;
  }
  next();
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food; 