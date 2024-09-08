const express = require('express');
const router = express.Router();
const User = require('../models'); // Adjust path to your User model

router.get('/random-featured-user', async (req, res) => {
  try {
    // Fetch users with a non-empty featuredVideoId
    const usersWithVideo = await User.find({ featuredVideoId: { $exists: true, $ne: '' } });

    if (usersWithVideo.length === 0) {
      return res.status(404).json({ message: 'No featured users with a video found' });
    }

    const count = usersWithVideo.length;
    const randomIndex = Math.floor(Math.random() * count);
    const user = usersWithVideo[randomIndex];

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

module.exports = router;
