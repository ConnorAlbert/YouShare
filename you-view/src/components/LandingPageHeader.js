import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#e5e5e5',
    color: '#363636'

  },
  logo: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#363636'
    
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '150px',
    color: '#363636'

  },
  navLink: {
    textDecoration: 'none',
    fontSize: '25px',
    color: '#363636'
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#363636',
    transition: 'color 0.3s ease',
  },
  icon: {
    fontSize: '60px',
    transform: 'translateY(10px)', // Move icon down by 10 pixels


  },
  text: {
    textDecoration: 'none',
    marginTop: '10px', // Updated marginTop value
    color: '#363636'

  },
};

const LandingPageHeader = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>YouShare</div>
        <nav>
          <ul style={styles.navLinks}>
            
            
          </ul>
        </nav>
        <div>
          <Link
            to="/login"
            style={{
              ...styles.link,
              ...(hovered ? { color: '#CCA43B' } : {}),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AccountCircleIcon style={styles.icon} />
            <p style={styles.text}>Log In</p>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPageHeader;
