import React from 'react';
import '../CSS/AboutMe.css';

interface StoreCardProps {
    imageUrl: string;
    name: string;
    position: string;
    description: string;
    
  }

  const Member: React.FC<StoreCardProps> = ({ imageUrl, name, position, description}) => {
    return (
    <div className='member_container'>

     
        <img src={imageUrl} alt="item picture" className="member_image" />  
 
       
       <div className='member_name'>
            <h2 style={{ fontWeight: 'bold' }}>{name}</h2>
       </div>

       <div className='member_position'>
            <h2>{position}</h2>
       </div>

       <div className='member_description'>
            <h5>{description}</h5>
        </div>

    </div>
    );
  };
  
  export default Member;