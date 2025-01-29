import React from 'react';
import '../CSS/Item.css';

import { Link} from 'react-router';

interface StoreCardProps {
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  orange?: string[];
  blue?: string[];
  black?: string[];
  grey?: string[];
}

const Item: React.FC<StoreCardProps> = ({ imageUrl, price, title, description, orange, blue, black, grey }) => {
  return (
    <Link to="/checkout" className="item-link" state={{ imageUrl, price, title, description, orange, blue, black, grey }}>
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