import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';


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
    <div style={{ height: '100%', backgroundColor: '#242F40', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        {/* Left Section */}
        <div style={{ width: '22.5%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px', padding: '20px' }}>
          <AccountCircleIcon style={styles.icon} />
          <h3 style={{ margin: '10px 0', color: '#CCA43B', textAlign: 'center', fontSize: '36px' }}>{featuredUser.username}</h3>
          <div style={{ backgroundColor: '#242F40', borderRadius: '50px', padding: '10px', textAlign: 'center', width: '60%' }}>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Current 🔥: 7</p>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Highscore 🏆: 12</p>
          </div>
        </div>

        {/* Middle Section */}
        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginTop: '0', textAlign: 'center', color: '#CCA43B', paddingTop: '10px' }}>Featured Creator</h2>
          <div style={{ width: '100%', height: '400px', backgroundColor: 'lightgray' }}>
            {featuredUser.featuredVideoId && (
              <iframe 
                width={'100%'}
                height={'100%'}
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
        <div style={{ width: '22.5%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', padding: '20px', justifyContent: 'center' }}>
          <h2 style={{ marginTop: '0', textAlign: 'center', color: '#CCA43B' }}>Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              style={checkboxes.like ? { ...styles.button, ...styles.buttonLiked } : { ...styles.button, ...styles.buttonLike }}
              onClick={() => handleActionClick('like')}
              disabled={checkboxes.like}
            >
              <ThumbUpAltOutlinedIcon style={{ marginRight: '10px' }} />
              {checkboxes.like ? 'Liked' : 'Like'}
            </button>
            <button
              style={checkboxes.comment ? { ...styles.button, ...styles.buttonCommented } : { ...styles.button, ...styles.buttonComment }}
              onClick={() => handleActionClick('comment')}
              disabled={checkboxes.comment}
            >
              {checkboxes.comment ? 'Commented' : 'Comment'}
            </button>
            <button
              style={checkboxes.subscribe ? { ...styles.button, ...styles.buttonSubscribed } : { ...styles.button, ...styles.buttonSubscribe }}
              onClick={() => handleActionClick('subscribe')}
              disabled={checkboxes.subscribe}
            >
              {checkboxes.subscribe ? 'Subscribed' : 'Subscribe'}
            </button>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: `${progressWidth}%` }}></div>
              <span style={styles.progressText}>{Math.round(progressWidth)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {verification.isVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{verification.action.charAt(0).toUpperCase() + verification.action.slice(1)} Verification</h2>
            <p>Did you complete the action?</p>
            <button
              style={{ ...styles.modalButton, ...styles.modalButtonConfirm}}
              onClick={() => handleVerificationResponse(true)}
            >
              Yes
            </button>
            <button
              style={{ ...styles.modalButton, ...styles.modalButtonClose }}
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

const styles = {
  icon: {
    fontSize: '12rem',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    margin: '10px 0',
    cursor: 'pointer',
    width: '100%', // Make buttons full width for consistent alignment
  },
  buttonLike: {
    backgroundColor: '#007BFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLiked: {
    backgroundColor: '#28A745',
  },
  buttonComment: {
    backgroundColor: 'rgb(204, 164, 59)',
  },
  buttonCommented: {
    backgroundColor: '#28A745',
  },
  buttonSubscribe: {
    backgroundColor: 'rgb(231, 14, 23)',
  },
  buttonSubscribed: {
    backgroundColor: '#28A745',
  },
  progressBarContainer: {
    width: '250%', // Full width of the container
    backgroundColor: '#4C4C4C',
    borderRadius: '25px',
    height: '20px',
    marginTop: '20px',
    position: 'static',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%', // Full height of the container
    backgroundColor: '#28A745',
    transition: 'width 0.3s ease',
    borderRadius: '25px',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: '20px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
  },
  modalButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    margin: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalButtonConfirm: {
    backgroundColor: '#28a745',
  },
  modalButtonClose: {
    backgroundColor: '#dc3545',
  },
};

export default Featured;

