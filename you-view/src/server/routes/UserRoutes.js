const express = require('express');
const router = express.Router();
const User = require('../models'); // Ensure correct path to your User model
const authenticate = require('../middleware/Authenticate'); // Middleware to authenticate requests

// Fetch current logged-in user
router.get('/current-user', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Fetch the current logged-in user using the user ID from the token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send back the user details
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Error fetching current user', error });
  }
});

// Fetch current featured video
router.get('/current-featured-video', authenticate, async (req, res) => {
  try {
    const userId = req.user._id; // Retrieve user ID from authentication middleware
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ videoId: user.featuredVideoId });
  } catch (error) {
    console.error('Error fetching user video:', error);
    res.status(500).json({ message: 'Error fetching user video', error });
  }
});

// Update featured video
router.post('/update-featured-video', authenticate, async (req, res) => {
  try {
    const userId = req.user._id; // Retrieve user ID from authentication middleware
    const { videoId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.featuredVideoId = videoId;
    await user.save();
    res.json({ message: 'Featured video updated successfully' });
  } catch (error) {
    console.error('Error updating featured video:', error);
    res.status(500).json({ message: 'Error updating featured video', error });
  }
});

// Fetch random featured user
router.get('/random-featured-user', authenticate, async (req, res) => {
  try {
    const currentUserId = req.user._id; // Retrieve current user ID from authentication middleware
    console.log('Current User ID:', currentUserId);

    // Find users with a featured video that are not the current logged-in user
    const usersWithVideo = await User.find({
      featuredVideoId: { $exists: true, $ne: '' },
      _id: { $ne: currentUserId }, // Exclude current user
    });

    if (usersWithVideo.length === 0) {
      return res.status(404).json({ message: 'No featured users with a video found' });
    }

    const count = usersWithVideo.length;
    const randomIndex = Math.floor(Math.random() * count);
    const user = usersWithVideo[randomIndex];

    res.json(user);
  } catch (error) {
    console.error('Error fetching featured user:', error);
    res.status(500).json({ message: 'Error fetching featured user', error });
  }
});

// Fetch user with the highest daily points
router.get('/highest-daily-points-user', authenticate, async (req, res) => {
  try {
    // Find the user with the highest daily points
    const userWithHighestPoints = await User.findOne().sort({ dailyPoints: -1 }).limit(1);

    if (!userWithHighestPoints) {
      return res.status(404).json({ message: 'No users with daily points found' });
    }

    res.json(userWithHighestPoints);
  } catch (error) {
    console.error('Error fetching user with highest daily points:', error);
    res.status(500).json({ message: 'Error fetching user with highest daily points', error });
  }
});

// Update current user's points when an action is performed
router.post('/update-points', authenticate, async (req, res) => {
  try {
    const { userId, action } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment points based on the action performed (each action gives 1 point)
    user.dailyPoints += 1;
    user.totalPoints += 1;

    await user.save();

    res.json(user); // Send the updated user back in the response
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ message: 'Error updating points', error });
  }
});

module.exports = router;
