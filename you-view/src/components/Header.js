import React, { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SidebarContent from './SidebarContent';
import HeaderContent from '../components/HeaderContent'





const Header = ({ level, xp }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state



  const toggleSidebar = () => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
  };


  const styles = {
    header: {
      backgroundColor: '#363636',
      minHeight: '10vh',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Center the content horizontally
      color: 'white',
    },
    profile: {
      width: '13.85%', // Match the width of the profile box
      minHeight: '10vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      paddingTop: '20px',
      paddingBottom: '20px',
      cursor: 'pointer',
      backgroundColor: sidebarOpen ? '#242F40' : '#363636', // Modified backgroundColor property
      border: isHovered ? '1px solid white' : '1px solid transparent', // Modified borderLeft property
    },
    icon: {
      fontSize: '2.5rem',
    },
    expBar: {
      width: '90%',
      height: '10px',
      backgroundColor: '#fff',
      position: 'relative',
    },
    expLevel: {
      position: 'absolute',
      top: '-20px',
      left: '0',
    },
    expLevelEnd: {
      position: 'absolute',
      top: '-20px',
      right: '0',
    },
    expFill: {
      height: '100%',
      background: 'linear-gradient(to right, #ffb02e, #ff6723)',
      transition: 'width 1s ease-in-out',
    },
    sidebar: {
      position: 'fixed',
      right: '0',
      width: '13.95%', // Match the width of the profile box
      height: '10vh', // Full height
      backgroundColor: '#363636',
      transition: 'transform 0.3s ease-in-out',
      border: isHovered ? '1px solid white' : '1px solid transparent',
    },
    profileName: {
      fontSize: '1.5rem',
      paddingBottom: '20px',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <HeaderContent />
          <div 
            style={styles.profile} 
            onClick={toggleSidebar}
            onMouseEnter={() => setIsHovered(true)} // Add this line
            onMouseLeave={() => setIsHovered(false)} // Add this line
          >
            <AccountCircleIcon style={styles.icon} />
            <div style={styles.profileName}>Profile</div>
            {!sidebarOpen && (
              <div style={styles.expBar}>
                <span style={styles.expLevel}>🔥{level}</span>
                <div style={{ ...styles.expFill, width: `${xp}%` }}></div>
                <span style={styles.expLevelEnd}>🔥{level + 1}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <SidebarContent level={level} xp={xp} />
      </div>
    </>
  );
};


export default Header;