import React from 'react';
import '../CSS/Item.css';
import { Link,} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface StoreCardProps {
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  
}

const Item: React.FC<StoreCardProps> = ({ imageUrl, price, title, description}) => {
  return (
    <Link as={RouterLink} to="/checkout" className="item-link" state={{ imageUrl, price, title, description }}>
       
    <div className="item-container">

      <div className="image-container">
        <img src={imageUrl} alt="item picture" className="item-image" />
      </div>

      <div className="price-container">
        <h2 className="price">${price}</h2>  
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