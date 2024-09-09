const jwt = require('jsonwebtoken');
const User = require('../models'); // Ensure correct path to your User model

const authenticate = async (req, res, next) => {
  try {
    console.log('Headers:', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'test12345test'); // Replace with your actual JWT secret
    console.log('Decoded Token:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(401).json({ message: 'Invalid token', error });
  }
};

module.exports = authenticate;
