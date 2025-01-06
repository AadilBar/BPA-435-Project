import React, { useState } from 'react';
import { useLocation } from "react-router";
import '../CSS/Product.css';
import { getDatabase, ref, set } from "firebase/database";

import useLogin from '../Auth/functions';
import { StepperInput } from '../components/ui/stepper-input';
import { createPortal } from 'react-dom';

const ProductDetails: React.FC = () => {
  const {
    user,
  } = useLogin();

  const location = useLocation();
  const { imageUrl, price, title, description } = location.state || {};

  const [color, setColor] = useState('Black');
  const [Size, setSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-container">
      <div className="image_container">
        <img src={imageUrl} alt={title} className="product-image" />
      </div>

      <div className="details_container">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>

        <div className="horizontal-line"></div>

        <h3 style={{
          fontFamily: 'Copperplate, serif',
          color: 'white',
          marginTop: '10px'
        }}>Color</h3>
        <div className="circles-container">
          <button className="circles"
            style={{
              backgroundColor: '#1A1A1A',
              outline: color === 'Black' ? '2px solid white' : 'none'
            }}
            onClick={() => setColor('Black')}
          ></button>

          <button className="circles"
            style={{
              backgroundColor: '#D891EF',
              outline: color === 'Purple' ? '2px solid white' : 'none'
            }}
            onClick={() => setColor('Purple')}
          ></button>

          <button className="circles"
            style={{
              backgroundColor: '#FF6B6B',
              outline: color === 'Red' ? '2px solid white' : 'none'
            }}
            onClick={() => setColor('Red')}
          ></button>

          <button className="circles"
            style={{
              backgroundColor: '#87CEFA',
              outline: color === 'Blue' ? '2px solid white' : 'none'
            }}
            onClick={() => setColor('Blue')}
          ></button>
        </div>

        <div>
          <h3 style={{
            fontFamily: 'Copperplate, serif',
            color: 'white',
            marginTop: '10px'
          }}>Size</h3>
        </div>

        <div className='sizes'>
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              className='size'
              style={{
          outline: Size === size ? '2px solid white' : 'none'
              }}
              onClick={() => setSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

      </div>

      <div className="price_container">
        <p className="product-price">${price}</p>
        <p className='sub1'>Price when purchased online</p>
        <p className='sub2'>Free 90 Day Returns - Sold By Stage Fright TM</p>
        <div>
          <span>Quantity:</span>
          <StepperInput defaultValue={'1'} onValueChange={({ value }: { value: string }) => setQuantity(Number(value))} />
        </div>
        <button className='add-to-cart-button' onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );

  function addToCart() {
    const db = getDatabase();
    if (user && user.email) {
      const usersRef = ref(db, "users/" + user.email.replace('.', ',') + "/cart/" + title + " " + color + " " + Size);
      const modifiedImageUrl = imageUrl.split('/').slice(2).join('/');
      set(usersRef, {
        title,
        Size,
        color,
        imageUrl: modifiedImageUrl,
        price,
        description,
        quantity: quantity
      });
    } else {
    alert("User is not logged in or email is missing");
    }
  }
};

export default ProductDetails;
