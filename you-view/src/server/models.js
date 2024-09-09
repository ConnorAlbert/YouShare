const mongoose = require('mongoose'); // Add this line

// User schema definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Case-insensitive username
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Case-insensitive email
  },
  password: {
    type: String,
    required: true,
  },
  featuredVideoId: {
    type: String,
    required: false, // Optional
    unique: false,
  },
  dailyPoints: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

// Create a unique index with case-insensitive collation for usernames
userSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const User = mongoose.model('User', userSchema);

module.exports = User;
