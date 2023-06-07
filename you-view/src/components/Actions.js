import React from 'react';

const Actions = ({ addXp }) => {
  return (
    <div style={{ backgroundColor: '#242F40', height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>

        {/* Section 1: View */}
        <div style={{ flexBasis: '25%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => addXp(1.6)}>
          <h3 style={{ textAlign: 'center', marginTop: 15 }}>View</h3>
          <div style={{ marginBottom: '10px', textAlign: 'center', width: '65%', height: '140px', backgroundColor: 'lightgray' }}></div>
          <div style={{ textAlign: 'center' }}>1.6<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div>

        {/* Section 2: Like */}
        <div style={{ flexBasis: '25%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => addXp(2.3)}>
          <h3 style={{ textAlign: 'center', marginTop: 15 }}>Like</h3>
          <div style={{ marginBottom: '10px', textAlign: 'center', width: '65%', height: '140px', backgroundColor: 'lightgray' }}></div>
          <div style={{ textAlign: 'center' }}>2.3<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div>

        {/* Section 3: Subscribe */}
        <div style={{ flexBasis: '25%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => addXp(4)}>
          <h3 style={{ textAlign: 'center', marginTop: 15 }}>Subscribe</h3>
          <div style={{ marginBottom: '10px', textAlign: 'center', width: '65%', height: '140px', backgroundColor: 'lightgray' }}></div>
          <div style={{ textAlign: 'center' }}>4<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div>

        {/* Section 4: Comment */}
        <div style={{ flexBasis: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => addXp(2.2)}>
          <h3 style={{ textAlign: 'center', marginTop: 15 }}>Comment</h3>
          <div style={{ marginBottom: '10px', textAlign: 'center', width: '65%', height: '140px', backgroundColor: 'lightgray' }}></div>
          <div style={{ textAlign: 'center' }}>2.2<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
