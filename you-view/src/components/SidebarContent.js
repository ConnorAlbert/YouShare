import React, { useState, useEffect } from 'react';
import CurrentEarning from './CurrentEarning';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../styles/SidebarContent.css'; // Import the new CSS file with unique class names

const SidebarContent = ({ level, xp }) => {
  const [filledPercentage, setFilledPercentage] = useState(0);
  const shouldShowLevel = xp >= 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);

  Modal.setAppElement('#root');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderModalContent = () => {
    switch (modalPage) {
      case 0:
        return <div style={{ marginTop: '25px', backgroundColor: '#242F40', height: '100%', maxHeight: 'calc(100% - 100px)' }}> <CurrentEarning /> </div>;
      case 1:
        return <div style={{ marginTop: '25px', backgroundColor: '#242F40', height: '100%', maxHeight: 'calc(100% - 100px)' }}>Tier Rewards Page</div>;
      case 2:
        return <div style={{ marginTop: '25px', backgroundColor: '#242F40', height: '100%', maxHeight: 'calc(100% - 100px)' }}>How does this work? Page</div>;
      default:
        return null;
    }
  };

  useEffect(() => {
    setFilledPercentage((xp / 100) * 100);

    if (filledPercentage === 100) {
      setTimeout(() => {
        setFilledPercentage(0);
      }, 1000);
    }
  }, [xp, filledPercentage]);

  return (
    <div className="sidebar-container">
      <div>
        <h3 className="sidebar-levelXp">
          <span className="sidebar-levelEmoji">
            <span className="sidebar-levelLabel">Level:</span>🔥{level}
          </span>
          <span style={{ margin: '0 20px', color: 'white' }}>XP: {xp.toFixed(1)}/100</span>
        </h3>
        <div className="sidebar-xpBar">
          <div className="sidebar-xpFill" style={{ height: `${filledPercentage}%` }}></div>
          {shouldShowLevel && <div className="sidebar-levelUp"></div>}
          <div className="sidebar-currentLevel">
            <h3></h3>
          </div>
        </div>
      </div>

      <div className="sidebar-linksContainer">
        <div className="sidebar-link">
          <div className="sidebar-button" onClick={() => { openModal(); setModalPage(0); }}>Profile Stats</div>
        </div>
        <div className="sidebar-link">
          <div className="sidebar-button" onClick={() => { openModal(); setModalPage(1); }}>Tier Rewards</div>
        </div>
        <div className="sidebar-link">
          <div className="sidebar-button" onClick={() => { openModal(); setModalPage(2); }}>How does this work?</div>
        </div>
        <Link to="/login" className="sidebar-link">
          <div className="sidebar-logoutButton">Log Out</div>
        </Link>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(54, 54, 54, 0.75)',
            },
            content: {
              width: '60%',
              height: '75%',
              margin: 'auto',
              backgroundColor: '#363636',
              boxSizing: 'border-box',
            },
          }}
        >
          <div className="sidebar-modalHeader">
            <div className={`sidebar-modalHeaderLink ${modalPage === 0 ? 'sidebar-modalHeaderLinkActive' : ''}`} onClick={() => setModalPage(0)}>Profile Stats</div>
            <div className={`sidebar-modalHeaderLink ${modalPage === 1 ? 'sidebar-modalHeaderLinkActive' : ''}`} onClick={() => setModalPage(1)}>Tier Rewards</div>
            <div className={`sidebar-modalHeaderLink ${modalPage === 2 ? 'sidebar-modalHeaderLinkActive' : ''}`} onClick={() => setModalPage(2)}>How does this work?</div>
          </div>
          {renderModalContent()}
          <button className="sidebar-closeButton" onClick={closeModal}>×</button>
        </Modal>
      </div>
    </div>
  );
};

export default SidebarContent;
