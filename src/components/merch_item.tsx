import React from 'react';
import '../CSS/Item.css';
import { motion } from "framer-motion"; 
import { Link } from 'react-router';

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
    <Link 
      to="/checkout" 
      className="item-link" 
      state={{ imageUrl, price, title, description, orange, blue, black, grey }} 
      onClick={() => window.scrollTo(0, 0)}
    >
      <motion.div
        className="item-container"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8 }}
      >
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
      </motion.div>
    </Link>
  );
};

export default Item;