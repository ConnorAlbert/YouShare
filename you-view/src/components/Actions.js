import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = ({ addXp }) => {
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState('');

  const extractVideoId = (url) => {
    if (url.includes('youtu.be')) {
      return url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch')) {
      return new URL(url).searchParams.get('v');
    }
    return null;
  };

  const handleLinkVideo = () => {
    const videoUrl = prompt("Please enter the YouTube video URL:");
    if (videoUrl) {
      const videoId = extractVideoId(videoUrl);
      if (videoId) {
        setVideoId(videoId);
      } else {
        alert("Invalid YouTube video URL");
      }
    }
  };

  const sectionStyle = {
    flexBasis: '33%',
    borderRight: '2px solid black',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const iframeStyle = {
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
                style={iframeStyle}
              />
            </div>
          ) : (
            <button style={buttonStyle} onClick={handleLinkVideo}>
              Link Your Video
            </button>
          )}
          {videoId && (
            <div
              style={{ textAlign: 'center', marginTop: 5, fontSize: 18, cursor: 'pointer', color: '#007BFF', textDecoration: 'underline' }}
              onClick={handleLinkVideo}
            >
              Change Video
            </div>
          )}
        </div>

        {/* Section 1: View */}
        <div
          style={sectionStyle}
          onClick={() => navigate('/viewPage')}
        >
          <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>YouTube</h3>
          <div style={{ position: 'relative', width: '60%', height: '200px' }}>
            <iframe
              src={`https://www.youtube.com/embed/hQrmtwhztnc`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={iframeStyle}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: 2.5, fontSize: 20 }}>
            1.6<span role="img" aria-label="Spark Emoji">⚡️</span>
          </div>
        </div>

        {/* Section 2: Twitch */}
        <div
          style={sectionStyle}
          onClick={() => addXp(2.3)}
        >
          <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Twitch</h3>
          <div style={{ textAlign: 'center', width: '60%', height: '200px', backgroundColor: 'lightgray' }}>
            <h1 style={{ backgroundColor: 'red', marginTop: '75px' }}>COMING SOON</h1>
          </div>
          <div style={{ textAlign: 'center', marginTop: 2.5, fontSize: 20 }}>
            2.3<span role="img" aria-label="Spark Emoji">⚡️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
