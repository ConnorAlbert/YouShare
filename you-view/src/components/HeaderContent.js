import React from 'react';
import Logo from '../assets/Images/logo-no-background.png'; 

const HeaderContent = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', marginLeft: '1%'}}>
        <img src={Logo} alt="Logo" className="logoImage" />
      </div>
    );
  };
  
  export default HeaderContent;
  