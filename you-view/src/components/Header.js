import React, { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SidebarContent from './SidebarContent';
import HeaderContent from '../components/HeaderContent'

const styles = {
  header: {
    backgroundColor: '#242F40',
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    color: 'white',
  },
  profile: {
    flexBasis: '16.67%', // 1/6th of the header
    backgroundColor: '#363636',
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    paddingTop: '20px',
    paddingBottom: '20px',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '8rem',
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
    width: '13.9%', // Match the width of the profile box
    height: '100vh', // Full height
    backgroundColor: '#363636',
    transition: 'transform 0.3s ease-in-out',
  },
};

const Header = ({ level, xp }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
  };

  return (
    <>
      <header style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <HeaderContent />
          <div style={styles.profile} onClick={toggleSidebar}>
            <AccountCircleIcon style={styles.icon} />
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