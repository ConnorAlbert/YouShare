import React, { useState } from 'react';
import Footer from './Footer';
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('https://www.youtube.com/watch?v=hQrmtwhztnc');

  const [progress, setProgress] = useState(0); // Update the progress value based on the actual video progress
  const [xp, setXp] = useState(0); // Add these two lines to maintain the same state variables
  const [level, setLevel] = useState(0); // Add these two lines to maintain the same state variables
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePlaybackStateChange = (isPlaying) => {
    setIsVideoPlaying(isPlaying);
  };

  const addXp = (xpToAdd) => { // Add the addXp function to maintain the same functionality
    setXp((prevXp) => prevXp + xpToAdd);
    if (xp + xpToAdd >= 100) {
      setLevel((prevLevel) => prevLevel + 1);
      setXp(0);
    }
  };

  return (
    <div style={styles.container}>
    <div style={styles.mainContent}>
      <Header level={level} xp={xp} handleSidebarToggle={handleSidebarToggle} /> 
      <div style={{ display: 'flex', flexDirection: 'column', height: '84.5%'  }}>
        <ContentArea onPlaybackStateChange={handlePlaybackStateChange} setProgress={setProgress} currentVideo= {currentVideo} />
        
      </div>
    </div>
  </div>
  );
}

export default ViewPage;