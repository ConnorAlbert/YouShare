import React from 'react';

const HeaderContent = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
        <h1 style={{ marginBottom: '10px' }}>YouShare</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: 'red' }}>
              <img src="youtube-icon.png" alt="YouTube" style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: 'purple' }}>
              <img src="twitch-icon.png" alt="Twitch" style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: 'blue' }}>
              <img src="tiktok-icon.png" alt="TikTok" style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
          <div style={{ flex: '1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: 'gold' }}>
              <img src="shop-icon.png" alt="Shop" style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeaderContent;
  