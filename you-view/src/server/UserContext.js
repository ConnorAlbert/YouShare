import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const UserContext = createContext();

// UserProvider component that wraps your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    dailyPoints: 0,
    totalPoints: 0,
    level: 1,
    featuredVideoId: '' // Add featuredVideoId to the initial state
  });

  const [xp, setXp] = useState(0);

  // Function to calculate level and XP dynamically
  const calculateLevelAndXP = (totalPoints) => {
    const level = Math.floor(totalPoints / 5); // Level up every 5 points
    const xpProgress = (totalPoints % 5) * 20; // XP progress as a percentage for next level (20% per point)
    return { level, xpProgress };
  };

  // Fetch the logged-in user's data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://youview-190cb1d0e6db.herokuapp.com/api/current-user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { username, dailyPoints, totalPoints, featuredVideoId } = response.data;
        const { level, xpProgress } = calculateLevelAndXP(totalPoints);

        setUser({ username, dailyPoints, totalPoints, level, featuredVideoId }); // Set featuredVideoId here
        setXp(xpProgress);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // A function to update points
  const updatePoints = (points) => {
    setUser((prevUser) => {
      const updatedTotalPoints = prevUser.totalPoints + points;
      const updatedDailyPoints = prevUser.dailyPoints + points;
      const { level, xpProgress } = calculateLevelAndXP(updatedTotalPoints);

      setXp(xpProgress);
      return { ...prevUser, totalPoints: updatedTotalPoints, dailyPoints: updatedDailyPoints, level };
    });
  };

  // A function to update the featuredVideoId
  const updateFeaturedVideo = (videoId) => {
    setUser((prevUser) => ({ ...prevUser, featuredVideoId: videoId }));
  };

  return (
    <UserContext.Provider value={{ user, xp, updatePoints, updateFeaturedVideo }}>
      {children}
    </UserContext.Provider>
  );
};
