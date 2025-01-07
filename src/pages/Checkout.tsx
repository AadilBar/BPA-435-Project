import React, { useContext, useState } from 'react';
import { useLocation } from "react-router";
import '../CSS/Product.css';
import { getDatabase, ref, set } from "firebase/database";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StepperInput } from '../components/ui/stepper-input';
import { UserContext } from '../App';

const ProductDetails: React.FC = () => {
  const { user } = useContext(UserContext);

  const location = useLocation();
  const { imageUrl, price, title, description } = location.state || {};

  const [color, setColor] = useState('Black');
  const [Size, setSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-container">
      <ToastContainer />
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
      toast.success(`${title} has been added to your cart!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: '#E9204F', // Text color (same for both success and error)
          backgroundColor: '#2C2C2C', // Dark gray background
        }
      });
      } else {
        toast.error('Please login to add items to your cart!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: '#E9204F', // Text color (same for both success and error)
            backgroundColor: '#2C2C2C', // Dark gray background
          }
        });
      
      }
      
  }
};

export default ProductDetails;
