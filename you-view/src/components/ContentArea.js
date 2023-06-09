import React, { useEffect, useRef, useState } from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

function ContentArea({ onPlaybackStateChange, setProgress }) {
  const playerRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState('https://www.youtube.com/watch?v=hQrmtwhztnc');
  const [playing,setPlaying]= useState(false);
  let intervalId = null; // Identifier of the interval for cleaning up later

  useEffect(() => {
    if (playerRef.current) {
      const player = new window.YT.Player(playerRef.current, {
        videoId: getVideoId(currentVideo),
        events: {
          onStateChange: onPlayerStateChange,
          onProgress: onPlayerProgress,
        },
      });
    }
  }, [currentVideo]);

  const getVideoId = (videoUrl) => {
    const url = new URL(videoUrl);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get('v');
  };


  const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
          console.log('Playing');
          // Clear previous interval if it exists
          if (intervalId) {
              clearInterval(intervalId);
          }
          // Call onPlayerProgress to update the progress immediately
          onPlayerProgress(event);
  
          // Start new interval to call onPlayerProgress every second
          intervalId = setInterval(() => {
              onPlayerProgress(event);
          }, 1000);
  
          onPlaybackStateChange(true); // Notify the parent component that video playback started
      } else if (event.data === window.YT.PlayerState.PAUSED) {
          console.log('Paused');
  
          // Clear the interval when the video is paused
          if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
          }
  
          onPlaybackStateChange(false); // Notify the parent component that video playback paused
      }
  };
  

  const onPlayerProgress = (event) => {
    const currentTime = event.target.getCurrentTime();
    const duration = event.target.getDuration();
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
    console.log('Progress:', calculatedProgress);
  };

  return (
    <div style={{ flex: 4, backgroundColor: '#363636', display: 'flex', flexDirection: 'row', color: 'white' }}>
      <div style={{ flex: '0 0 20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button style={{ marginBottom: '10px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px 30px' }}>
          <ThumbUpAltOutlinedIcon style={{ fontSize: '28px', marginRight: '5px' }} />
          <span>Like</span>
        </button>
        <div style={{ marginBottom: '70px', fontSize: '24px' }}>2.4✨</div>
        <button style={{ marginTop: '70px', cursor: 'pointer', backgroundColor: 'rgb(231 14 23)', color: 'white', border: 'none', borderRadius: '5px', fontSize: '24px', padding: '15px 30px' }}>Subscribe</button>
        <div style={{ marginTop: '10px', fontSize: '24px' }}>4✨</div>
      </div>
      <div style={{ flex: '0 0 60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div ref={playerRef} style={{ width: '100%', height: '90%' }}></div>
      </div>
      <div style={{ flex: '0 0 20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginBottom: '10px', fontSize: '24px' }}>Add a comment</div>
        <textarea placeholder="Type a constructive comment and publish it to earn ✨" style={{ backgroundColor: '#242F40', marginBottom: '10px', width: '80%', height: '25%', resize: 'none', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', color: 'white' }} />
        <button style={{ marginTop: '10px', cursor: 'pointer', backgroundColor: '#CCA43B', color: 'white', border: 'none', borderRadius: '5px', fontSize: '24px', padding: '15px 30px' }}>Publish</button>
        <div style={{ marginTop: '10px', fontSize: '24px' }}>3.2✨</div>
      </div>
    </div>
  );
}

export default ContentArea;
