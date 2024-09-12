import React, { useState, useEffect, useCallback } from 'react';
import SidebarContent from './SidebarContent';
import HeaderContent from '../components/HeaderContent';
import axios from 'axios';
import '../styles/Header.css'; // Updated to reflect the unique CSS file name

const Header = ({ handleSidebarToggle, updatedPoints }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', dailyPoints: 0, totalPoints: 0, level: 1 });
  const [xp, setXp] = useState(0); // XP progress bar

  // Function to calculate level and XP dynamically
  const calculateLevelAndXP = (totalPoints) => {
    const level = Math.floor(totalPoints / 5); // Level up every 5 points
    const xpProgress = (totalPoints % 5) * 20; // XP progress as a percentage for next level (20% per point)
    return { level, xpProgress };
  };

  // Fetch current logged-in user's data from the backend
  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.get('https://youview-190cb1d0e6db.herokuapp.com/api/current-user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { username, dailyPoints, totalPoints } = response.data; // Include username
      const { level, xpProgress } = calculateLevelAndXP(totalPoints);

      setCurrentUser({ username, dailyPoints, totalPoints, level });
      setXp(xpProgress);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []); // Empty dependency array to ensure fetchUserData is only created once

  useEffect(() => {
    fetchUserData(); // Fetch data initially when component mounts

    // Set up polling to fetch updated points every 10 seconds
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [fetchUserData]); // Include fetchUserData in dependency array

  // Update points when "Yes" is confirmed from the featured page
  useEffect(() => {
    if (updatedPoints) {
      setCurrentUser(prevUser => {
        const updatedTotalPoints = prevUser.totalPoints + updatedPoints; // Adjust points based on the prop passed
        const updatedDailyPoints = prevUser.dailyPoints + updatedPoints;
        const { level, xpProgress } = calculateLevelAndXP(updatedTotalPoints);
        setXp(xpProgress);

        return { ...prevUser, totalPoints: updatedTotalPoints, dailyPoints: updatedDailyPoints, level };
      });
    }
  }, [updatedPoints]); // Run whenever updatedPoints changes

  const toggleSidebar = () => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    handleSidebarToggle();
  };

  return (
    <>
      <header className="unique-header">
        <div className="unique-header-container">
          <HeaderContent />
          <div 
            className={`unique-profile ${sidebarOpen ? 'unique-sidebar-open' : ''} ${isHovered ? 'unique-hovered' : ''}`} 
            onClick={toggleSidebar}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: sidebarOpen ? '#242f3f' : isHovered ? '#242f3f' : '#363636',
              border: sidebarOpen || isHovered ? '1px solid white' : '1px solid transparent',
            }}
          >
            
            {/* Display logged-in user's username */}
            <div className="unique-profile-name">{currentUser.username}</div>

            {/* Points display (Daily and Total) */}
            <div className="unique-points-container">
              <div className="unique-points-box">
                <p className="unique-points-daily">Daily Points: <span className="unique-points-count">{currentUser.dailyPoints}</span></p>
              </div>
              <div className="unique-points-box">
                <p className="unique-points-total">Total Points: <span className="unique-points-count">{currentUser.totalPoints}</span></p>
              </div>
            </div>

            {/* Level and XP bar */}
            {!sidebarOpen && (
              <div className="unique-exp-bar">
                <span className="unique-exp-level">🔥{currentUser.level}</span>
                <div className="unique-exp-fill" style={{ width: `${xp}%` }}></div>
                <span className="unique-exp-level-end">🔥{currentUser.level + 1}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Sidebar */}
      <div className={`unique-sidebar ${sidebarOpen ? 'unique-open' : ''}`}>
        <SidebarContent level={currentUser.level} xp={xp} />
      </div>
    </>
  );
};

export default Header;
