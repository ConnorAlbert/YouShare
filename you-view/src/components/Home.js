import React, { useState } from 'react';
import Header from './Header';
import Featured from './Featured';
import Actions from './Actions';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden', // Disable scrolling
  },
  mainContent: {
    flexBasis: '100%',
    overflow: 'hidden', // Disable scrolling
  },
};

const Home = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);

  const addXp = (xpToAdd) => {
    setXp((prevXp) => prevXp + xpToAdd);
    if (xp + xpToAdd >= 100) {
      setLevel((prevLevel) => prevLevel + 1);
      setXp(0);
    }
  };

  const handleSidebarToggle = () => {
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
      <Header level={level} xp={xp} handleSidebarToggle={handleSidebarToggle} />
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flexBasis: '55%' }}>
            <Featured />
          </div>
          <div style={{ flexBasis: '45%' }}>
            <Actions addXp= {addXp}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
