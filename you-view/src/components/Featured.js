import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import '../styles/Featured.css'; // Import the CSS file

const extractVideoId = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'youtu.be' ? urlObj.pathname.split('/')[1] : urlObj.searchParams.get('v');
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

const Featured = () => {
  const [checkboxes, setCheckboxes] = useState({ like: false, comment: false, subscribe: false });
  const [progressWidth, setProgressWidth] = useState(0);
  const [verification, setVerification] = useState({ action: '', isVisible: false });
  const [channelId, setChannelId] = useState('');
  const [featuredUser, setFeaturedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchFeaturedUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/random-featured-user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setFeaturedUser(response.data);
        if (response.data.featuredVideoId) {
          const videoId = extractVideoId(response.data.featuredVideoId);
          if (videoId) {
            const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
            const videoData = await videoResponse.json();
            
            if (videoData.items?.length) {
              setChannelId(videoData.items[0].snippet.channelId);
            }
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Unauthorized. Please log in again.');
        } else {
          console.error('Error fetching featured user:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedUser();
  }, [apiKey]);

  useEffect(() => {
    const selectedCount = Object.values(checkboxes).filter(Boolean).length;
    const totalCheckboxes = Object.values(checkboxes).length;
    setProgressWidth((selectedCount / totalCheckboxes) * 100);
  }, [checkboxes]);

  const handleActionClick = (action) => {
    if (featuredUser?.featuredVideoId) {
      const videoId = extractVideoId(featuredUser.featuredVideoId);
      const url = action === 'subscribe' && channelId
        ? `https://www.youtube.com/channel/${channelId}`
        : `https://www.youtube.com/watch?v=${videoId}`;

      if (url) {
        window.open(url, '_blank');
        setVerification({ action, isVisible: true });
      }
    } else {
      alert('No video associated with the featured user.');
    }
  };

  const handleVerificationResponse = (didComplete) => {
    if (didComplete) {
      setCheckboxes(prev => ({ ...prev, [verification.action]: true }));
    }
    setVerification({ action: '', isVisible: false });
  };

  if (loading) return <p>Loading...</p>;
  if (!featuredUser) return <p>No featured user found</p>;

  return (
    <div className="featured-container">
      <div className="featured-inner">
        {/* Left Section */}
        <div className="left-section">
        <AccountCircleIcon style={{ fontSize: '10rem', color: '#CCA43B' }} />
          
          <div className="points-container">
          <h3 className="username">{featuredUser.username}</h3>
            <div className="points-box">
              <p className="points-text">Daily Points: <span className="points-count">7</span></p>
            </div>
            <div className="points-box">
              <p className="points-text">Total Points: <span className="points-count">12</span></p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="middle-section">
          <h2 className="title">Featured Creator</h2>
          <div className="video-container">
            {featuredUser.featuredVideoId && (
              <iframe 
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractVideoId(featuredUser.featuredVideoId)}?`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2 className="title">Actions</h2>
          <div className="actions-container">
            <button
              className={`button buttonLike ${checkboxes.like ? 'buttonLiked' : ''}`}
              onClick={() => handleActionClick('like')}
              disabled={checkboxes.like}
            >
              <ThumbUpAltOutlinedIcon style={{ marginRight: '10px' }} />
              {checkboxes.like ? 'Liked' : 'Like'}
            </button>
            <button
              className={`button buttonComment ${checkboxes.comment ? 'buttonCommented' : ''}`}
              onClick={() => handleActionClick('comment')}
              disabled={checkboxes.comment}
            >
              {checkboxes.comment ? 'Commented' : 'Comment'}
            </button>
            <button
              className={`button buttonSubscribe ${checkboxes.subscribe ? 'buttonSubscribed' : ''}`}
              onClick={() => handleActionClick('subscribe')}
              disabled={checkboxes.subscribe}
            >
              {checkboxes.subscribe ? 'Subscribed' : 'Subscribe'}
            </button>
            
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {verification.isVisible && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>{verification.action.charAt(0).toUpperCase() + verification.action.slice(1)} Verification</h2>
            <p>Did you complete the action?</p>
            <button
              className="modalButton modalButtonConfirm"
              onClick={() => handleVerificationResponse(true)}
            >
              Yes
            </button>
            <button
              className="modalButton modalButtonClose"
              onClick={() => handleVerificationResponse(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;
