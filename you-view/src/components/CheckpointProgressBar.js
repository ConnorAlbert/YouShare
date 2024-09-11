import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function CheckpointProgressBar({ value }) {
  const checkpoints = [
    { position: '25%', label: '0.5✨' },
    { position: '50%', label: '1✨' },
    { position: '75%', label: '1.5✨' },
    { position: '100%', label: '2✨' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '3em' }}>
      <LinearProgress variant="determinate" value={value} style={{ height: '100%', backgroundColor: 'white' }} />
      {checkpoints.map((checkpoint, index) => (
        <div key={index} style={{ position: 'absolute', left: `calc(${checkpoint.position} - 10px)`, textAlign: 'center' }}>
          <div style={{ height: '100%', width: '2px', backgroundColor: 'black' }} />
          <div style={{ marginTop: '5px' }}>{checkpoint.label}</div>
        </div>
      ))}
    </div>
  );
}

export default CheckpointProgressBar;
