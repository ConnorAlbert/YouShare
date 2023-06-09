import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function CheckpointProgressBar({ value }) {
  const checkpoints = Array.from({ length: 5 }, (_, i) => (
    <div key={i} style={{ position: 'absolute', left: `calc(${(i + 1) * 20}% - 20px)`, textAlign: 'center' }}>
      <div style={{ height: '100%', width: '3px', backgroundColor: 'black' }} />
      <div style={{ marginTop: '5px' }}>{(i + 3) * 0.5}✨</div>
    </div>
  ));

  return (
    <div style={{ position: 'relative', width: '100%', height: '3em' }}>
      <LinearProgress variant="determinate" value={value} style={{ height: '100%', backgroundColor: 'white' }} />
      {checkpoints}
    </div>
  );
}

export default CheckpointProgressBar;
