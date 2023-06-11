import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const styles = {
  icon: {
    fontSize: '12rem',
  },
};

const Featured = () => {
  const [checkboxes, setCheckboxes] = useState({
    like: false,
    comment: false,
    subscribe: false,
  });
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const selectedCount = Object.values(checkboxes).filter((value) => value).length;
    const totalCheckboxes = Object.values(checkboxes).length;
    const progress = (selectedCount / totalCheckboxes) * 100;
    setProgressWidth(progress);
  }, [checkboxes]);

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  return (
    <div style={{ height: '100%', backgroundColor: '#242F40', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        {/* Left Section */}
        <div style={{ width: '22.5%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px', padding: '20px' }}>
          <AccountCircleIcon style={styles.icon} />
          <h3 style={{ margin: '10px 0', color: '#CCA43B', textAlign: 'center',fontSize: '36px' }}>Youhungry</h3>
          <div style={{ backgroundColor: '#242F40', borderRadius: '50px', padding: '10px', textAlign: 'center', width: '60%' }}>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Current 🔥: 7</p>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Avg 🔥: 2.6</p>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Given ⚡️: 234k</p>
            <p style={{ margin: '5px 0', color: 'white', fontSize: '24px' }}>Gained ⚡️: 434k</p>
          </div>
        </div>

        {/* Middle Section */}

        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginTop: '0', textAlign: 'center', color: '#CCA43B',paddingTop: '10px' }}>Featured Creator</h2>
          <div style={{ width: '100%', height: '400px', backgroundColor: 'lightgray' }}>
          <iframe 
          width={'100%'}
          height={'100%'}
                src={`https://www.youtube.com/embed/FWQ6-0Fj5Jw`} 
                title="YouTube video player" 
              frameborder="1" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen> 
            </iframe>


          </div>
        </div>

        {/* Right Section */}
        <div style={{ width: '22.5%', marginLeft: '10px', padding: '20px' }}>
          <div style={{ backgroundColor: '#242F40', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>Multiply your Earning</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }} onClick={() => handleCheckboxChange('like')}>
              <label
                htmlFor="likeCheckbox"
                style={{
                  backgroundColor: checkboxes.like ? '#363636' : '#CCA43B',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Like
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }} onClick={() => handleCheckboxChange('comment')}>
              <label
                htmlFor="commentCheckbox"
                style={{
                  backgroundColor: checkboxes.comment ? '#363636' : '#CCA43B',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Comment
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px', justifyContent: 'center'  }} onClick={() => handleCheckboxChange('subscribe')}>
              <label
                htmlFor="subscribeCheckbox"
                style={{
                  backgroundColor: checkboxes.subscribe ? '#363636' : '#CCA43B',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Subscribe
              </label>
            </div>
            <div style={{ height: '12px', backgroundColor: '#fff', width: '80%', marginBottom: '10px' }}>
              <div
                style={{
                  width: `${progressWidth}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, #ffb02e, #ff6723)',
                  transition: 'width 0.5s ease',
                }}
              ></div>
            </div>
            <h1 style={{ color: 'white', marginBottom: '0px' }}>UNLOCK</h1>
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
              3x
              <span role="img" aria-label="Spark Emoji">
                ⚡️
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
