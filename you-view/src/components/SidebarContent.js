import React, { useState, useEffect } from 'react';
import CurrentEarning from './CurrentEarning';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const SidebarContent = ({ level, xp }) => {
  const [filledPercentage, setFilledPercentage] = useState(0);
  

  const shouldShowLevel = xp >= 10; // Check if at least 10% of total XP has been added

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true) ;
  const closeModal = () => setIsModalOpen(false);
  const [modalPage, setModalPage] = useState(0);


  Modal.setAppElement('#root'); // replace '#root' with the id of your app's root element if it's different

  const renderModalContent = () => {
    switch(modalPage) {
      case 0: 
        return <div style={{marginTop: '25px', backgroundColor: '#242F40',height: '100%', maxHeight: 'calc(100% - 100px)'}}> <CurrentEarning/> </div>;
      case 1: 
        return <div style={{marginTop: '25px', backgroundColor: '#242F40', height: '100%',maxHeight: 'calc(100% - 100px)'}}>Tier Rewards Page</div>;
      case 2: 
        return <div style={{marginTop: '25px', backgroundColor: '#242F40', height: '100%',maxHeight: 'calc(100% - 100px)'}}>How does this work? Page</div>;
      default: 
        return null;
    }
  }


  useEffect(() => {
    setFilledPercentage((xp / 100) * 100);

    if (filledPercentage === 100) {
      setTimeout(() => {
        setFilledPercentage(0);
      }, 1000);
    }
  }, [xp, filledPercentage]);

  const styles = {
    container: {
      backgroundColor: '#242F40',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid white',
      borderBottom: '1px solid white',
      borderRight: '1px solid white',
    },
    levelXp: {
      textAlign: 'center',
      color: 'white',
    },
    levelEmoji: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelLabel: {
      marginRight: '5px',
    },
    xpBar: {
      height: '400px',
      width: '40px',
      background: '#fff',
      margin: '0 auto',
      position: 'relative',
    },
    xpFill: {
      height: `${filledPercentage}%`,
      width: '100%',
      background: 'linear-gradient(to right, #ffb02e, #ff6723)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      transition: 'height 1s',
    },
    levelUp: {
      position: 'absolute',
      top: '-20px',
      color: 'black',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    currentLevel: {
      position: 'absolute',
      bottom: '-45px',
      color: 'white',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    linksContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '50px',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
    button: {
      width: '200px',
      height: '40px',
      backgroundColor: '#3D4D57',
      textAlign: 'center',
      lineHeight: '40px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    logoutButton: {
      width: '200px',
      height: '40px',
      backgroundColor: 'red',
      textAlign: 'center',
      lineHeight: '40px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'center',
      padding: '15px',
      borderBottom: '1px solid #fff',
    },
    modalHeaderLink: {
      cursor: 'pointer',
      color: '#fff',
      padding: '10px 20px',
      backgroundColor: '#242F40',
      borderRadius: '5px',
      margin: '0 10px',
      textDecoration: 'none',
      textAlign: 'center',
      transition: 'background-color 0.3s',
    },
    modalHeaderLinkActive: {
      backgroundColor: '#536dfe', // change to desired active color
    },
    closeButton: {
      position: 'absolute',
      top: '1px',
      right: '10px',
      border: 'none',
      background: 'transparent',
      color: '#fff',
      fontSize: '3em',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.levelXp}>
          <span style={styles.levelEmoji}>
            <span style={styles.levelLabel}>Level:</span>🔥{level}
          </span>
          <span style={{ margin: '0 20px', color: 'white' }}>XP: {xp.toFixed(1)}/100</span>
        </h3>
        <div style={styles.xpBar}>
          <div style={styles.xpFill}></div>
          {shouldShowLevel && (
            <div style={styles.levelUp}>
            
            </div>
          )}
          <div style={styles.currentLevel}>
            <h3>🔥{level}</h3>
          </div>
        </div>
      </div>
      

      <div style={styles.linksContainer}>
        <div style={styles.link} >
          <div style={styles.button} onClick={() => {openModal(); setModalPage(0);}}>Profile Stats</div>
        </div>
        <div style={styles.link} >
          <div style={styles.button} onClick={() => {openModal(); setModalPage(1);}}>Tier Rewards</div>
        </div>
        <div style={styles.link} >
          <div style={styles.button} onClick={() => {openModal(); setModalPage(2);}}>How does this work?</div>
        </div>
        <Link to="/login" style={styles.link}>
          <div style={styles.logoutButton}>Log Out</div>
        </Link>

        <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      backgroundColor: 'rgba(54, 54, 54, 0.75)', // #242F40 with 75% opacity
    },
    content: {
      width: '60%', // adjust the width as per your needs
      height: '75%', // adjust the height as per your needs
      margin: 'auto', // centers the modal
      backgroundColor: '#363636',
      boxSizing: 'border-box', // Add this line

    },
  }}
>
<div style={styles.modalHeader}>
  <div style={{...styles.modalHeaderLink, ...(modalPage === 0 && styles.modalHeaderLinkActive)}} onClick={() => setModalPage(0)}>Profile Stats</div>
  <div style={{...styles.modalHeaderLink, ...(modalPage === 1 && styles.modalHeaderLinkActive)}} onClick={() => setModalPage(1)}>Tier Rewards</div>
  <div style={{...styles.modalHeaderLink, ...(modalPage === 2 && styles.modalHeaderLinkActive)}} onClick={() => setModalPage(2)}>How does this work?</div>
</div>
  {renderModalContent()}
  <button style={styles.closeButton} onClick={closeModal}>×</button>
</Modal>
      </div>
    </div>
  );
};

export default SidebarContent;