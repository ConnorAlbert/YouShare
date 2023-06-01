import React from 'react';
import CurrentEarning from './CurrentEarning';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  currentEarning: {
    backgroundColor: "#363636",
    flexBasis: '16.67%', // 1/6th of the screen
  },
  mainContent: {
    flexBasis: '83.33%', // Remaining 5/6th of the screen
  },
};

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.currentEarning}>
        <CurrentEarning />
      </div>
      <div style={styles.mainContent}>
        <h1>Welcome to Home!</h1>
        {/* Rest of your Home content goes here */}
      </div>
    </div>
  );
};

export default Home;
