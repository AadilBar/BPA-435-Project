import React, { useState } from 'react';

const ButtonSection: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelectedButton(id);
  };

  return (
    <div className='left-top-sub'>
      <button 
        className={`ltsp ${selectedButton === 'Back-Row' ? 'selected' : ''}`} 
        onClick={() => handleClick('Back-Row')}
      >
        <div className='price_title'>
          Back-Row
        </div>
        <div className='price_description'>
          Enjoy the music without breaking the bank! Back-row seats are the most affordable option, 
          perfect for those who want to soak in the concert atmosphere while staying within budget. 
          These seats still offer a great view of the stage, along with the collective energy of the crowd. 
          Ideal for casual fans or those looking for an economical way to experience live music, the back-row 
          seats ensure you don’t miss out on the fun.
        </div>
        <div className='counter'></div>
      </button>

      <button 
        className={`ltsp ${selectedButton === 'Middle-Row' ? 'selected' : ''}`} 
        onClick={() => handleClick('Middle-Row')}
      >
        <div className='price_title'>
          Middle-Row
        </div>
        <div className='price_description'>
          The fan favorite! Middle-row seats strike the perfect balance between price and proximity, offering 
          an immersive experience with a fantastic view of the stage. Positioned at the heart of the action, 
          these seats allow you to feel connected to both the artist and the audience. A popular choice for 
          good reason, these seats often sell out quickly, so be sure to grab yours before they’re gone!
        </div>
        <div className='counter'></div>
      </button>

      <button 
        className={`ltsp ${selectedButton === 'Up Close and Personal' ? 'selected' : ''}`} 
        onClick={() => handleClick('Up Close and Personal')}
      >
        <div className='price_title'>
          Up Close and Personal
        </div>
        <div className='price_description'>
          Get ready for an unforgettable concert experience with the Up Close and Personal seats! These premium spots
          provide the best view, placing you right near the stage for an intimate, face-to-face encounter with the artist. 
          With limited availability, this exclusive option ensures a memorable night with an unmatched perspective. Perfect
          for passionate fans and those seeking lifelong memories, these seats are a must for true music lovers.
        </div>
        <div className='counter'></div>
      </button>
    </div>
  );
};

export default ButtonSection;