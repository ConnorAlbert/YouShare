import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SidebarContent = ({ level, xp }) => {
  const [filledPercentage, setFilledPercentage] = useState(0);
  const shouldShowLevel = xp >= 10; // Check if at least 10% of total XP has been added

  useEffect(() => {
    setFilledPercentage((xp / 100) * 100);

    if (filledPercentage === 100) {
      setTimeout(() => {
        setFilledPercentage(0);
      }, 1000);
    }
  }, [xp, filledPercentage]);

  const styles = {
    container: {
      backgroundColor: '#242F40',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid white',
      borderBottom: '1px solid white',
      borderRight: '1px solid white',
    },
    levelXp: {
      textAlign: 'center',
      color: 'white',
    },
    levelEmoji: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelLabel: {
      marginRight: '5px',
    },
    xpBar: {
      height: '400px',
      width: '40px',
      background: '#fff',
      margin: '0 auto',
      position: 'relative',
    },
    xpFill: {
      height: `${filledPercentage}%`,
      width: '100%',
      background: 'linear-gradient(to right, #ffb02e, #ff6723)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      transition: 'height 1s',
    },
    levelUp: {
      position: 'absolute',
      top: '-20px',
      color: 'black',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    currentLevel: {
      position: 'absolute',
      bottom: '-45px',
      color: 'white',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    linksContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
      margin: '10px 0',
    },
    button: {
      width: '200px',
      height: '40px',
      backgroundColor: '#3D4D57',
      textAlign: 'center',
      lineHeight: '40px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    logoutButton: {
      width: '200px',
      height: '40px',
      backgroundColor: 'red',
      textAlign: 'center',
      lineHeight: '40px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.levelXp}>
          <span style={styles.levelEmoji}>
            <span style={styles.levelLabel}>Level:</span>🔥{level}
          </span>
          <span style={{ margin: '0 20px', color: 'white' }}>XP: {xp.toFixed(1)}/100</span>
        </h3>

        <div style={styles.xpBar}>
          <div style={styles.xpFill}></div>
          {shouldShowLevel && (
            <div style={styles.levelUp}>
              <h3>🔥{level + 1}</h3>
            </div>
          )}
          <div style={styles.currentLevel}>
            <h3>🔥{level}</h3>
          </div>
        </div>
      </div>

      <div style={styles.linksContainer}>
        <Link to="/how-does-xp-work" style={styles.link}>
          <div style={styles.button}>Tier Rewards</div>
        </Link>
        <Link to="/how-does-this-work" style={styles.link}>
          <div style={styles.button}>How does this work?</div>
        </Link>
        <Link to="/login" style={styles.link}>
          <div style={styles.logoutButton}>Log out</div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarContent;
