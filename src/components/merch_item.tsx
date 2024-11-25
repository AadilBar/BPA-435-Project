import React from 'react';
import './Item.css'; // Import the external CSS file
import { Box, Flex, Link,} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface StoreCardProps {
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  link : string;
}

const Item: React.FC<StoreCardProps> = ({ imageUrl, price, title, description, link}) => {
  return (
    <Link as={RouterLink} to="/checkout" className="item-link">
    <div className="item-container">

      <div className="image-container">
        <img src={imageUrl} alt="item picture" className="item-image" />
      </div>

      <div className="title-container">
        <h3 className="title">{title}</h3>
      </div>


      <div className="description-container">
        <p className="description">{description}</p>
      </div>

    </div>
    </Link>
  );
};

export default Item;