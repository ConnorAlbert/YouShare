import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className='landingPage'>
            <LandingPageHeader />
            <h1>Welcome to Our Website!</h1>
            <p>This is the landing page for our awesome website. Here, you can learn more about our services and products.</p>
        </div>
    );
};

export default LandingPage;
