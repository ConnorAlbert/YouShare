import React, { useRef  } from 'react';
import { Link } from 'react-router-dom';
import LandingPageHeader from './LandingPageHeader';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Image from '../assets/Images/computer.png';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { keyframes } from "@emotion/react";
import styled from '@emotion/styled';

const styles = {
  landingPage: {
    backgroundColor: '#e5e5e5',
    height: '200vh',
  },
  heading: {
    fontSize: '72px',
    fontWeight: 'bold',
    whiteSpace: 'pre-line',
    paddingLeft: '20px',
    color: '#242f40'
  },
  body: {
    paddingLeft: '20px',
    fontSize: '20px',
    color: '#363636'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    marginLeft: '50px'
  },
  button: {
    backgroundColor: '#CCA43B',
    color: 'black',
    padding: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '8px 8px 0px -2px rgba(0, 0, 0, 0.75)',
  },
  arrowIcon: {
    marginLeft: '10px',
  },
  shadowBox: {
    backgroundColor: '#242f40',
    marginTop: '20px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    height: '70vh',
    marginLeft: '100px',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#363636',
  },
  imageContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonUnderImage: {
    transform: 'translateY(-50px)',
    marginRight: '100px',

  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  nextSection: {
    backgroundColor: '#242F40',
    height: '7vh',  
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',  
    width: '100%',
    padding: '50px 0', 
  },
  nextSectionButton: {
    backgroundColor: '#363636',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: '2px',
    color: 'white',
    padding: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: '35%', 
    position: 'relative',  
    zIndex: 1, 
  },
  leftBouncingArrow: {
    fontSize: '72px',
    left: '200px', 
    top: '40%', 
    transform: 'translateY(-50%)', 
  },
  rightBouncingArrow: {
    fontSize: '72px',
    right: '200px',  
    top: '40%', 
    transform: 'translateY(-50%)', 
  },
};


const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const BouncingArrow = styled(ArrowDownwardIcon)`
  position: absolute;
  font-size: 2.5rem;
  animation: ${bounce} 2s infinite;
  color: white;
`;



const LandingPage = () => {

  const howItWorksSectionRef = useRef(null);

  const handleHowItWorksClick = () => {
    howItWorksSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div style={styles.landingPage}>
      <LandingPageHeader />
      <div style={styles.flexContainer}>
        <div>
          <h1 style={styles.heading}>
            Unleash Your<br />
            Content, Ignite<br />
            Your Influence!
          </h1>
          <p style={styles.body}>
          Ever felt like your content could make waves if only the algorithms played nice? <br /><br />
          With youShare, seize control from elusive algorithms and put the power back in your hands.<br /> Here, your creative brilliance meets an audience
          of like-minded individuals hungry for content <br />just like yours. And the beauty of it all? You're in the driver's
          seat. The more content you explore, <br />the broader your reach becomes. Dive into a sea of creativity, and in return,
          let your own work<br /> bask in the limelight. With youShare, ignite your influence. Start the content revolution today!.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img src={Image} alt="computer" style={styles.image} />
          <div style={styles.buttonUnderImage}>
            <Box style={styles.shadowBox}>
            <Link
            to="/login"
            style={{
              ...styles.link,
            }}
          >
              <Button variant="contained" style={styles.button}>
                Get Started
                <ArrowForwardIcon style={styles.arrowIcon} />
              </Button>
              </Link>
            </Box>
          </div>
        </div>
      </div>
      <div style={styles.nextSection}>
      <BouncingArrow style={styles.leftBouncingArrow} />
      <Button variant="contained" style={styles.nextSectionButton} onClick={handleHowItWorksClick}>
          How it all works
        </Button>
        <BouncingArrow style={styles.rightBouncingArrow} />
      </div>
      <div ref={howItWorksSectionRef}>
        <div>
          Stuff and things
        </div>
        {/* <HowItWorksHeader /> */}
        {/* ... Other content in the "How it works" section ... */}
      </div>
    </div>
  );
};



export default LandingPage;
