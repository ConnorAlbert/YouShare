import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function TopBar() {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
    },
    icon: {
      fontSize: '3rem',
      color: 'white',
    },
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#363636', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={styles.header}>
        <AccountCircleIcon style={styles.icon} />
      </div>
      {/* Add the contents of your header here */}
    </div>
  );
}

export default TopBar;
