import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YouTubeImage from '../assets/Images/youtubelogo.jpg'; // Import your YouTube image
import TwitchImage from '../assets/Images/twitchpage.jpg'; // Import your Twitch image

const Actions = ({ addXp }) => {
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState('');
  const [hoverChangeVideo, setHoverChangeVideo] = useState(false); // State for Change Video hover
  const [hoverYouTube, setHoverYouTube] = useState(false); // State for YouTube hover
  const [hoverTwitch, setHoverTwitch] = useState(false); // State for Twitch hover

  const extractVideoId = (url) => {
    try {
      if (!url.startsWith('http')) {
        // If it's already a video ID, return it as-is
        return url;
      }
      
      const videoUrl = new URL(url);
      if (videoUrl.hostname === 'youtu.be') {
        // Handle short URLs like https://youtu.be/videoId
        return videoUrl.pathname.split('/')[1];
      }
      if (videoUrl.hostname === 'www.youtube.com' && videoUrl.pathname === '/watch') {
        // Handle full YouTube URLs like https://www.youtube.com/watch?v=videoId
        return videoUrl.searchParams.get('v');
      }
      return null;
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  };
  useEffect(() => {
    const fetchCurrentVideo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://youview-190cb1d0e6db.herokuapp.com/api/current-featured-video', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.videoId) {
          setVideoId(response.data.videoId);
        }
      } catch (error) {
        console.error('Error fetching current video:', error);
      }
    };

    fetchCurrentVideo();
  }, []);

  const handleLinkVideo = async () => {
    const videoUrl = prompt("Please enter the YouTube video URL or ID:");
    if (videoUrl) {
      const newVideoId = extractVideoId(videoUrl); // Extract the video ID
      if (newVideoId) {
        try {
          const token = localStorage.getItem('token');
          await axios.post('https://youview-190cb1d0e6db.herokuapp.com/api/update-featured-video', 
            { videoId: newVideoId }, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setVideoId(newVideoId); // Update state with the new video ID
        } catch (error) {
          console.error('Error updating featured video:', error);
        }
      } else {
        alert("Invalid YouTube video URL or ID");
      }
    }
  };

  const sectionStyle = {
    flexBasis: '33%',
    borderRight: '2px solid black',
    borderTop: '2px solid black',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  };

  const hoverSectionStyle = (isHovered) => ({
    ...sectionStyle,
    backgroundColor: isHovered ? '#555' : '#363636', // Change background color on hover
  });

  const imgStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
  };

  const buttonStyle = {
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
    marginTop: '75px',
  };

  const changeVideoStyle = {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
    cursor: 'pointer',
    color: hoverChangeVideo ? '#FF4500' : '#007BFF', // Hover effect color change
    textDecoration: hoverChangeVideo ? 'none' : 'underline', // Remove underline on hover
    transition: 'color 0.3s ease, text-decoration 0.3s ease', // Smooth transition
  };

  return (
    <div style={{ backgroundColor: '#363636', height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        {/* Section 0: Your Video */}
        <div style={sectionStyle}>
          <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Your Content</h3>
          {videoId ? (
            <div style={{ position: 'relative', width: '60%', height: '200px' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={imgStyle}
              />
            </div>
          ) : (
            <button style={buttonStyle} onClick={handleLinkVideo}>
              Link Your Video
            </button>
          )}
          {videoId && (
            <div
              style={changeVideoStyle}
              onMouseEnter={() => setHoverChangeVideo(true)}  // Hover state for Change Video
              onMouseLeave={() => setHoverChangeVideo(false)} // Reset hover state for Change Video
              onClick={handleLinkVideo}
            >
              Change Video
            </div>
          )}
        </div>

        {/* Section 1: View - YouTube Image */}
        <div
          style={hoverSectionStyle(hoverYouTube)}
          onMouseEnter={() => setHoverYouTube(true)}  // Hover state for YouTube
          onMouseLeave={() => setHoverYouTube(false)} // Reset hover state for YouTube
          onClick={() => navigate('/viewPage')}
        >
          <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Gain points now.</h3>
          <div style={{ position: 'relative', width: '50%', height: '200px' }}>
            <img
              src={YouTubeImage} // Use the imported image
              alt="YouTube Page"
              style={imgStyle}
            />
          </div>
        </div>

        {/* Section 2: Twitch Image */}
        <div
          style={hoverSectionStyle(hoverTwitch)}
          onMouseEnter={() => setHoverTwitch(true)}  // Hover state for Twitch
          onMouseLeave={() => setHoverTwitch(false)} // Reset hover state for Twitch
          onClick={() => addXp(2.3)}
        >
          <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Twitch</h3>
          <div style={{ position: 'relative', width: '50%', height: '200px' }}>
            <img
              src={TwitchImage} // Use the imported Twitch image
              alt="Twitch Page"
              style={imgStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
