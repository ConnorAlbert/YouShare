const express = require('express');
const router = express.Router();
const User = require('../models'); // Ensure correct path to your User model

// Middleware to authenticate requests
const authenticate = require('../middleware/Authenticate');

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
      _id: { $ne: currentUserId } // Exclude current user
    });

    console.log('Users with video:', usersWithVideo); // Add this line

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

module.exports = router;
