const mongoose = require('mongoose');

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
});

// Create a unique index with case-insensitive collation for usernames
userSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const User = mongoose.model('User', userSchema);

module.exports = User;
