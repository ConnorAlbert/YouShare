import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import '../styles/Featured.css';

const extractVideoId = (input) => {
  try {
    if (!input.startsWith('http')) {
      return input;
    }
    const videoUrl = new URL(input);
    if (videoUrl.hostname === 'youtu.be') {
      return videoUrl.pathname.split('/')[1];
    }
    if (videoUrl.hostname === 'www.youtube.com' && videoUrl.pathname === '/watch') {
      return videoUrl.searchParams.get('v');
    }
    return null;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

const Featured = ({ updateHeaderPoints }) => {
  const [checkboxes, setCheckboxes] = useState({ like: false, comment: false, subscribe: false });
  const [progressWidth, setProgressWidth] = useState(0);
  const [verification, setVerification] = useState({ action: '', isVisible: false });
  const [channelId, setChannelId] = useState('');
  const [featuredUser, setFeaturedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFeaturedUserCurrentUser, setIsFeaturedUserCurrentUser] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const navigate = useNavigate();
  
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setShowLoginError(true);
          return;
        }

        const [featuredResponse, currentUserResponse] = await Promise.all([
          axios.get('https://youview-190cb1d0e6db.herokuapp.com/api/highest-daily-points-user', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://youview-190cb1d0e6db.herokuapp.com/api/current-user', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setFeaturedUser(featuredResponse.data);
        setCurrentUser(currentUserResponse.data);

        if (featuredResponse.data.featuredVideoId) {
          const videoId = extractVideoId(featuredResponse.data.featuredVideoId);
          if (videoId) {
            const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
            const videoData = await videoResponse.json();
            
            if (videoData.items?.length) {
              setChannelId(videoData.items[0].snippet.channelId);
            }
          }
        }

        if (currentUserResponse.data._id === featuredResponse.data._id) {
          setIsFeaturedUserCurrentUser(true);
        }
        
      } catch (error) {
        if (error.response?.status === 401) {
          setShowLoginError(true);
        } else {
          console.error('Error fetching data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, navigate]);

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

  const handleVerificationResponse = async (didComplete) => {
    if (didComplete && verification.action) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://youview-190cb1d0e6db.herokuapp.com/api/update-points', {
          userId: currentUser._id,
          action: verification.action,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedUser = response.data;
        setCurrentUser(updatedUser);
        setCheckboxes(prev => ({ ...prev, [verification.action]: true }));

        if (updateHeaderPoints) {
          updateHeaderPoints(updatedUser.dailyPoints, updatedUser.totalPoints);
        }
      } catch (error) {
        console.error('Error updating points:', error);
      }
    }
    setVerification({ action: '', isVisible: false });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;
  if (!featuredUser) return <p>No featured user found</p>;

  const videoId = extractVideoId(featuredUser.featuredVideoId);

  return (
    <div className="featured-container">
      {showLoginError && (
        <div className="error-banner">
          <p>You must be logged in to view this page.</p>
          <button onClick={handleLoginRedirect}>Go to Login</button>
        </div>
      )}

      <div className="featured-inner">
        <div className="left-section">
          <AccountCircleIcon style={{ fontSize: '10rem', color: '#CCA43B' }} />
          
          <div className="points-container">
            <h3 className="username">{featuredUser.username}</h3>
            <div className="points-box">
              <p className="points-text">Daily Points: <span className="points-count">{featuredUser.dailyPoints}</span></p>
            </div>
            <div className="points-box">
              <p className="points-text">Total Points: <span className="points-count">{featuredUser.totalPoints}</span></p>
            </div>
          </div>
        </div>

        <div className="middle-section">
          <h2 className="title">
            {isFeaturedUserCurrentUser ? "You are the Featured Creator" : "Featured Creator"}
          </h2>
          <div className="video-container">
            {isFeaturedUserCurrentUser && !videoId ? (
              <div className="no-video-message">
                <p>Please link a video to display here.</p>
              </div>
            ) : (
              videoId && (
                <YouTube
                  videoId={videoId}
                  opts={{ height: '500', width: '100%' }}
                />
              )
            )}
          </div>
        </div>

        <div className="right-section">
          <div className="actions-wrapper">
            <h2 className="actions-title">Actions</h2>
            <div className="actions-container">
              <button
                className={`button buttonLike ${checkboxes.like ? 'buttonLiked' : ''}`}
                onClick={() => handleActionClick('like')}
                disabled={checkboxes.like || isFeaturedUserCurrentUser}
              >
                <ThumbUpAltOutlinedIcon style={{ marginRight: '10px' }} />
                {checkboxes.like ? 'Liked' : 'Like'}
              </button>
              <button
                className={`button buttonComment ${checkboxes.comment ? 'buttonCommented' : ''}`}
                onClick={() => handleActionClick('comment')}
                disabled={checkboxes.comment || isFeaturedUserCurrentUser}
              >
                {checkboxes.comment ? 'Commented' : 'Comment'}
              </button>
              <button
                className={`button buttonSubscribe ${checkboxes.subscribe ? 'buttonSubscribed' : ''}`}
                onClick={() => handleActionClick('subscribe')}
                disabled={checkboxes.subscribe || isFeaturedUserCurrentUser}
              >
                {checkboxes.subscribe ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

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
