import React from 'react';

const LoginPage = () => {
  const styles = {
    loginPage: {
      display: 'flex',
      height: '100vh',
    },
    leftSection: {
      backgroundColor: 'red',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightSection: {
      backgroundColor: 'blue',
      flex: 1,
    },
    logo: {
      fontSize: '32px',
      color: 'white',
    },
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.leftSection}>
        <h1 style={styles.logo}>YouShare</h1>
      </div>
      <div style={styles.rightSection}></div>
    </div>
  );
};

export default LoginPage;
