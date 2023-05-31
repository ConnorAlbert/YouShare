import React from 'react';
import LandingPageHeader from './LandingPageHeader';

const styles = {
    landingPage: {
      backgroundColor: '#e5e5e5',
      height: '100vh',
    },
  };

const LandingPage = () => {
    return (
        <div style={styles.landingPage}>
            <LandingPageHeader />
            <h1>Welcome to Our Website!</h1>
            <p>This is the landing page for our awesome website. Here, you can learn more about our services and products.</p>
        </div>
    );
};

export default LandingPage;
