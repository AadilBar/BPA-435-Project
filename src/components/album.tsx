import React from 'react';
import './album.css';

interface StoreCardProps {
  imageUrl: string;
  releaseText: string;
  title: string;
  description: string;
  
}
const Album: React.FC<StoreCardProps> = ({ imageUrl, releaseText, title, description }) => {

  return (
    <div>
      <div className="album-container">

        <div className="album-image-container">
          <img src={imageUrl} alt="item picture" className="album-image" />
        </div>

        <div className="album-price-container">
          <h2 className="album-price">${releaseText}</h2>  
        </div>

        <div className="album-title-container">
          <h3 className="album-title">{title}</h3>
        </div>


        <div className="album-description-container">
          <p className="album-description">{description}</p>
        </div>

      </div>
    </div>


  );
};

export default Album;