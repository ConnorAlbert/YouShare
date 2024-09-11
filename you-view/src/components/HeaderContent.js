import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Logo from '../assets/Images/logo-no-background.png'; 

const HeaderContent = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the main landing page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', marginLeft: '1%' }}>
      <img 
        src={Logo} 
        alt="Logo" 
        className="logoImage" 
        onClick={handleLogoClick} // Add the onClick event to navigate back to the landing page
        style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
      />
    </div>
  );
};

export default HeaderContent;
