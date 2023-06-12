import React from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';
import CheckpointProgressBar from './CheckpointProgressBar';

function Footer({ isVideoPlaying, progress, sidebarOpening }) {
  const navigate = useNavigate();

  const footerStyle = {
    flex: 1, 
    width: sidebarOpening ? '100%' : '86.1%',
    backgroundColor: '#363636', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: 'white',
    transition: 'width 0.3s ease-in-out'
  };

  return (
    <div style={footerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <div onClick={() => navigate('/home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '50px' }}>
          <ArrowCircleLeftOutlinedIcon style={{ color: 'white', fontSize: '7em',cursor: 'pointer',
 }} />
          <div>Home</div>
        </div>
        <div style={{ flex: 1, padding: '0 100px' }}>
          <CheckpointProgressBar value={progress} />
        </div>
        <div onClick={() => console.log('Next Video')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '50px' }}>
          <ArrowCircleRightOutlinedIcon style={{ color: 'white', fontSize: '7em',cursor: 'pointer',
 }} />
          <div>Next</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
