import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = ({ addXp }) => {
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState('');

  const handleLinkVideo = () => {
    const videoUrl = prompt("Please enter the YouTube video URL:");
    if (videoUrl) {
      let videoId;
      if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl.split('youtu.be/')[1];
      } else {
        videoId = new URL(videoUrl).searchParams.get('v');
      }
  
      if (videoId) {
        setVideoId(videoId);
      } else {
        alert("Invalid YouTube video URL");
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#363636', height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>  
        {/* Section 0: YourVideo */}
        <div           
        style={{ flexBasis: '33%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }   }>
        <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10}}>Your Content</h3>
          {
            videoId ?
            (
              <div style={{ position: 'relative', width: '60%', height: '200px' }}>
              <iframe 
                src={`https://www.youtube.com/embed/${videoId}`} 
                title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen 
              style={{ width: '100%', height: '100%', position: 'absolute' }}>
            </iframe>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
            }}
            ></div>
          </div>
            ) : (
              <button style={{ 
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                transitionDuration: '0.4s',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'block',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginTop: '75px',
             }}
             onClick={handleLinkVideo}
             >Link Your Video</button>
            )
            
          }
          {
            videoId ?
            (
            <div style={{ textAlign: 'center', marginTop:5, fontSize:18,cursor: 'pointer',  color: '#007BFF',  textDecoration: 'underline',

          }}>Change Video</div>) 
            : 
            (<></>)}


        </div>


        {/* Section 1: View */}
        <div style={{ flexBasis: '33%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center',cursor: 'pointer',
 }} onClick={() => { navigate('/viewPage');  }}>
          <h3 style={{ textAlign: 'center', marginTop: 10, marginBottom: 10}}>YouTube</h3>
          <div style={{ position: 'relative', width: '60%', height: '200px' }}>
    <iframe 
    src={`https://www.youtube.com/embed/hQrmtwhztnc`} 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen 
    style={{ width: '100%', height: '100%', position: 'absolute' }}>
  </iframe>
  <div style={{ 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
  }}></div>
</div>

         
               <div style={{ textAlign: 'center', marginTop:5, fontSize:20 }}>1.6<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div>

        {/* Section 2: Like */}
        <div style={{ flexBasis: '33%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => addXp(2.3)}>
          <h3 style={{ textAlign: 'center', marginTop: 5 }}>Twitch</h3>
          <div style={{ marginBottom: '10px', textAlign: 'center', width: '60%', height: '200px', backgroundColor: 'lightgray' }}> <h1 style={{backgroundColor: 'red', marginTop:'75px'}}>COMING SOON</h1></div>
          <div style={{ textAlign: 'center' }}>2.3<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div>

        {/* <div style={{ flexBasis: '25%', borderRight: '2px solid black', paddingRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => addXp(4)}>
          <h3 style={{ textAlign: 'center', marginTop: 15 }}>Subscribe</h3>
          <div style={{ marginBottom: '10px', textAlign: 'center', width: '65%', height: '140px', backgroundColor: 'lightgray' }}></div>
          <div style={{ textAlign: 'center' }}>4<span role="img" aria-label="Spark Emoji">⚡️</span></div>
        </div> */}


      </div>
    </div>
  );
};

export default Actions;
