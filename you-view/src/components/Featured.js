import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import axios from 'axios';

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
  buttonComment: {
    backgroundColor: 'rgb(204, 164, 59)',
  },
  buttonSubscribe: {
    backgroundColor: 'rgb(231, 14, 23)',
  },
  buttonLiked: {
    backgroundColor: '#4CAF50',
    cursor: 'not-allowed',
  },
  buttonCommented: {
    backgroundColor: '#4CAF50',
    cursor: 'not-allowed',
  },
  buttonSubscribed: {
    backgroundColor: '#4CAF50',
    cursor: 'not-allowed',
  },
  progressBarContainer: {
    height: '12px',
    backgroundColor: '#fff',
    width: '200%',
    marginTop: '10px',
    position: 'relative',
    borderRadius: '5px',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.3)',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(to right, #ffb02e, #ff6723)',
    borderRadius: '5px',
    transition: 'width 0.5s ease',
    
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    animation: 'fadeIn 0.3s',
  },
  modalButton: {
    margin: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  modalButtonClose: {
    backgroundColor: '#f44336',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
};

const extractVideoId = (url) => {
  const urlObj = new URL(url);
  const queryParams = new URLSearchParams(urlObj.search);
  return queryParams.get('v') || null;
};

const Featured = () => {
  const [checkboxes, setCheckboxes] = useState({
    like: false,
    comment: false,
    subscribe: false,
  });
  const [progressWidth, setProgressWidth] = useState(0);
  const [verification, setVerification] = useState({ action: '', isVisible: false });
  const [channelId, setChannelId] = useState('');
  const [featuredUser, setFeaturedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = 'AIzaSyCXYmNPgOeUrJ5l_cJfgPdbT_TGabBpRuQ'; // Replace with your YouTube Data API key

  useEffect(() => {
    const fetchFeaturedUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/random-featured-user');
        setFeaturedUser(response.data);
        if (response.data.featuredVideoId) {
          const videoId = extractVideoId(response.data.featuredVideoId);
          if (videoId) {
            const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
            const videoData = await videoResponse.json();
            if (videoData.items && videoData.items.length > 0) {
              setChannelId(videoData.items[0].snippet.channelId);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching featured user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedUser();
  }, []);

  useEffect(() => {
    const selectedCount = Object.values(checkboxes).filter((value) => value).length;
    const totalCheckboxes = Object.values(checkboxes).length;
    const progress = (selectedCount / totalCheckboxes) * 100;
    setProgressWidth(progress);
  }, [checkboxes]);

  const handleActionClick = (action) => {
    let url;
    if (featuredUser?.featuredVideoId) {
      const videoId = extractVideoId(featuredUser.featuredVideoId);
      if (action === 'like' || action === 'comment') {
        url = `https://www.youtube.com/watch?v=${videoId}`;
      } else if (action === 'subscribe' && channelId) {
        url = `https://www.youtube.com/channel/${channelId}`;
      }

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
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [verification.action]: true,
      }));
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
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Avg 🔥: 2.6</p>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Given ⚡️: 234k</p>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Gained ⚡️: 434k</p>
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

      {verification.isVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{verification.action.charAt(0).toUpperCase() + verification.action.slice(1)} Verification</h2>
            <p>Did you complete the action?</p>
            <button
              style={styles.modalButton}
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

export default Featured;
