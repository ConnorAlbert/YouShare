import React, { useState } from 'react';
import Header from './Header'; // Import the Header component
import ContentArea from './ContentArea';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden', // Disable scrolling
  },
  mainContent: {
    flexBasis: '100%',
    overflow: 'hidden', // Disable scrolling
  },
  footer: {
    width: '80%',
  },
};

function ViewPage() {
  const [setIsVideoPlaying] = useState(false);
  const [setProgress] = useState(0);
  const [xp, setXp] = useState(0);
  const [level] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePlaybackStateChange = (isPlaying) => {
    setIsVideoPlaying(isPlaying);
  };

  

  const updateHeaderPoints = (dailyPoints, totalPoints) => {
    // Assuming this function updates points in the header
    // You can adjust this based on your actual implementation
    console.log('Updating header points:', dailyPoints, totalPoints);
    // Perform necessary updates, for example:
    setXp(dailyPoints); // or other relevant logic
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <Header level={level} xp={xp} handleSidebarToggle={handleSidebarToggle} />
        <div style={{ display: 'flex', flexDirection: 'column', height: '84.5%' }}>
          <ContentArea
            onPlaybackStateChange={handlePlaybackStateChange}
            setProgress={setProgress}
            updateHeaderPoints={updateHeaderPoints} // Pass updateHeaderPoints to ContentArea
          />
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
