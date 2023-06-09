import React, { useState } from 'react';
import Footer from './Footer';
import TopBar from './TopBar';
import ContentArea from './ContentArea';

function ViewPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Update the progress value based on the actual video progress

  const handlePlaybackStateChange = (isPlaying) => {
    setIsVideoPlaying(isPlaying);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <ContentArea onPlaybackStateChange={handlePlaybackStateChange} setProgress={setProgress} />
      <Footer isVideoPlaying={isVideoPlaying} progress={progress} />
    </div>
  );
}

export default ViewPage;
