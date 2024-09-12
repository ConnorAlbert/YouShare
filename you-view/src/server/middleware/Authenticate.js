const jwt = require('jsonwebtoken');
const User = require('../models'); // Ensure this path is correct for your User model

// Load environment variables
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    console.log('Headers:', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const secretKey = process.env.JWT_SECRET; // Use environment variable for secret key
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded Token:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticate;
