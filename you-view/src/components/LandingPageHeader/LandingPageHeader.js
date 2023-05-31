import React from 'react';
import './LandingPageHeader.module.css';
import { Link } from 'react-router-dom';


const LandingPageHeader = () => {
    return (
        <header className='header'>
            <h1 className='logo'>YouShare</h1>
            <nav>
                <ul className='nav_links'>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <Link to="/login" className='login_btn'>Log In</Link>
        </header>
    );
};

export default LandingPageHeader;
