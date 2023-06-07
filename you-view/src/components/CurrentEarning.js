import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  profilePicture: {
    width: '80px',
    height: '80px',
  },
  profileName: {
    color: '#e5e5e5',
    marginTop: '8px',
    fontWeight: 'bold',
  },
  statsContainer: {
    marginTop: '16px',
    textAlign: 'center',
  },
  statLabel: {
    color: 'lightgray',
    marginBottom: '8px',
  },
  statValue: {
    color: '#e5e5e5',
    fontWeight: 'bold',
  },
  currentContent: {
    color: '#e5e5e5',
    marginTop: '32px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  videoPreview: {
    marginTop: '16px',
    marginBottom: '16px',
    width: '90%',
    height: '200px',
    margin: 'auto',
  },
  replaceText: {
    marginTop: '16px',
    color: '#blue',
    textAlign: 'center',
  },
  tileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '32px',
  },
  tile: {
    width: '200px',
    height: '100px',
    perspective: '1000px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f9f9f9',
    position: 'relative',
  },
  flipCardFront: {
    backgroundColor: '#363636',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    transition: 'transform 0.5s',
    transform: 'rotateY(0deg)',
    zIndex: 2,
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    transition: 'transform 0.5s',
    transform: 'rotateY(180deg)',
    zIndex: 1,
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },
  tab: {
    flex: '1',
    padding: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid #ccc',
    background: '#f9f9f9',
  },
  selectedTab: {
    background: '#ddd',
  },
  tabText: {
    fontWeight: 'bold',
  },
  title: {
    color: '#e5e5e5',
    marginTop: '16px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  replaceButton: {
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    transitionDuration: '0.4s',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: 'auto',
    display: 'block',
  },
};

const CurrentEarning = () => {
  const [isAllTimeSelected, setAllTimeSelected] = useState(false);
  const [videoURL, setVideoURL] = useState('');

  const handleTabClick = (isAllTime) => {
    setAllTimeSelected(isAllTime);
  };

  const handleReplaceClick = () => {
    const url = window.prompt('Please enter the URL of the YouTube video');
    const videoId = url.split('v=')[1];
    setVideoURL(`https://www.youtube.com/embed/${videoId}`);
  };

  return (
    <div>
      <div style={styles.tileContainer}>
        <div className="flip-card" style={styles.tile}>
          <div className="flip-card-front" style={styles.flipCardFront}>
            <div style={styles.tabContainer}>
              <div
                style={{
                  ...styles.tab,
                  ...(isAllTimeSelected ? {} : styles.selectedTab),
                }}
                onClick={() => handleTabClick(false)}
              >
                <Typography variant="subtitle1" style={styles.tabText}>
                  Current Content
                </Typography>
              </div>
              <div
                style={{
                  ...styles.tab,
                  ...(isAllTimeSelected ? styles.selectedTab : {}),
                }}
                onClick={() => handleTabClick(true)}
              >
                <Typography variant="subtitle1" style={styles.tabText}>
                  All Time
                </Typography>
              </div>
            </div>
          </div>
          <div className="flip-card-back" style={styles.flipCardBack}>
            <div style={styles.tabContainer}>
              <div
                style={{
                  ...styles.tab,
                  ...(isAllTimeSelected ? styles.selectedTab : {}),
                }}
                onClick={() => handleTabClick(false)}
              >
                <Typography variant="subtitle1" style={styles.tabText}>
                  Currently Selected
                </Typography>
              </div>
              <div
                style={{
                  ...styles.tab,
                  ...(isAllTimeSelected ? {} : styles.selectedTab),
                }}
                onClick={() => handleTabClick(true)}
              >
                <Typography variant="subtitle1" style={styles.tabText}>
                  All Time
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Typography variant="h4" style={styles.title}>
        {isAllTimeSelected ? 'All Time Earnings' : 'Current Earning'}
      </Typography>
      <Box style={styles.container}>
        <Avatar alt="Profile Picture" src="path/to/profile-picture.png" style={styles.profilePicture} />
        <Typography variant="h6" style={styles.profileName}>
          Blissfulgamer
        </Typography>
        <div style={styles.statsContainer}>
          <Typography variant="body1" style={styles.statLabel}>
            Highest🔥
          </Typography>
          <Typography variant="body1" style={styles.statValue}>
            0
          </Typography>
          <Typography variant="body1" style={styles.statLabel}>
            Avg🔥
          </Typography>
          <Typography variant="body1" style={styles.statValue}>
            0
          </Typography>
          <Typography variant="body1" style={styles.statLabel}>
            Given (🔥)
          </Typography>
          <Typography variant="body1" style={styles.statValue}>
            0
          </Typography>
          <Typography variant="body1" style={styles.statLabel}>
            Est Gained (🔥)
          </Typography>
          <Typography variant="body1" style={styles.statValue}>
            0
          </Typography>
        </div>
      </Box>
      {!isAllTimeSelected && (
        <div>
          <Typography variant="h5" style={styles.currentContent}>
            Current Content
          </Typography>
          <div style={styles.videoPreview}>
            {videoURL && <iframe src={videoURL} title="Selected Video" width="100%" height="95%" />}
          </div>
          <button
          onClick={handleReplaceClick}
          style={styles.replaceButton}
          >
          Link Video
          </button>
        </div>
      )}
      {isAllTimeSelected && (
        <div>
          <Typography variant="h5" style={styles.currentContent}>
            Select a Video for Earning
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CurrentEarning;