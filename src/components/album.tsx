import React from 'react';
import './album.css';
import { Link, useDisclosure,} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

interface StoreCardProps {
  imageUrl: string;
  releaseText: string;
  title: string;
  description: string;
  
}
const Album: React.FC<StoreCardProps> = ({ imageUrl, releaseText, title, description }) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <div onClick={onOpen}>
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