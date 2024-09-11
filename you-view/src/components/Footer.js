import React from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';
import CheckpointProgressBar from './CheckpointProgressBar';

function Footer({ isVideoPlaying, progress, sidebarOpening, fetchRandomUser }) {
  const navigate = useNavigate();

  const footerStyle = {
    width: sidebarOpening ? '85%' : '100%',
    height: '81px', // Make the footer shorter
    backgroundColor: '#333', // Updated background color
    display: 'flex',
    alignItems: 'center', // Center vertically
    justifyContent: 'space-between', // Spread items horizontally
    padding: ' 35px', // Adjust padding to fit inside the shorter footer
    color: 'white',
    transition: 'width 0.3s ease-in-out',
    marginTop: '45px'
  };

  const iconStyle = {
    fontSize: '7em', // Keep icon size large
    cursor: 'pointer',
  };

  return (
    <div style={footerStyle}>
      <div onClick={() => navigate('/home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ArrowCircleLeftOutlinedIcon style={iconStyle} />
        <div>Home</div>
      </div>
      <div style={{ flex: 1, padding: '0 50px' }}>
        <CheckpointProgressBar value={progress} />
      </div>
      <div onClick={fetchRandomUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ArrowCircleRightOutlinedIcon style={iconStyle} />
        <div>Next</div>
      </div>
    </div>
  );
}

export default Footer;
