import React, { useState } from 'react';
import { useLocation } from 'react-router';
import '../CSS/Product.css';


import 'react-toastify/dist/ReactToastify.css';
import Counter from '../components/package_counter';
import ReviewCarousel from '../components/review';

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const { imageUrl, price, title, description, orange, blue, black, grey } = location.state || {};

  const [selectedColor, setSelectedColor] = useState<string[]>(black || []);
  const [mainImage, setMainImage] = useState<string>(selectedColor[0] || imageUrl);


  const [selectedColorButton, setSelectedColorButton] = useState<string>('');

  const handleColor = (color: string[], colorName: string) => {
    setSelectedColor(color);
    setMainImage(color[0]); // Set the first image of the selected color as the main image
    setSelectedColorButton(colorName); // Track the selected color button
  };

  const reviews = [
    {
      imageUrl: `${import.meta.env.BASE_URL}/images/People/VocalistImage.jpg`,
      name: 'Sophia Reed',
      rating: 5,
      description: '“I’ve never been more impressed with a product – it works perfectly and looks amazing!”',
    },
    {
      imageUrl: `${import.meta.env.BASE_URL}/images/People/VocalistImage.jpg`,
      name: 'John Doe',
      rating: 5,
      description: '“This product has completely exceeded my expectations, offering both quality and great value.”',
    },
    {
      imageUrl: `${import.meta.env.BASE_URL}/images/People/VocalistImage.jpg`,
      name: 'Jane Smith',
      rating: 5,
      description: '“I can’t believe how much this has improved my daily routine – truly a game-changer!”',
    },
  ];

  return (
    <div>
      <div className="product-container">
        <div className="product-images-container">
          {/* Additional Images */}
          <div className="add-images">
            {selectedColor.map((image, index) => (
              <button 
                key={index} 
                className="add-images-btn"
                onClick={() => setMainImage(image)}
              >
                <img 
                  src={image} 
                  alt={`Additional image ${index}`} 
                  className="add-images-img" 
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="main-image">
            <img src={mainImage} alt={title} className="main-image-img" />
          </div>
        </div>

        <div className="product-details-container">
          <h2 className="product-title">{title}</h2>
          <p className="product-description">{description}</p>

          <div className="divider"></div>

          <h3 className="product-color-title">Color</h3>
          <div className="color-options">
            <button 
              className={`color-btn ${selectedColorButton === 'black' ? 'selected' : ''}`} 
              style={{ backgroundColor: '#010B13' }} 
              onClick={() => handleColor(black, 'black')}
            ></button>
            <button 
              className={`color-btn ${selectedColorButton === 'grey' ? 'selected' : ''}`} 
              style={{ backgroundColor: '#bac2bc' }} 
              onClick={() => handleColor(grey, 'grey')}
            ></button>
            <button 
              className={`color-btn ${selectedColorButton === 'orange' ? 'selected' : ''}`} 
              style={{ backgroundColor: '#bf6b3d' }} 
              onClick={() => handleColor(orange, 'orange')}
            ></button>
            <button 
              className={`color-btn ${selectedColorButton === 'blue' ? 'selected' : ''}`} 
              style={{ backgroundColor: '#225b9c' }} 
              onClick={() => handleColor(blue, 'blue')}
            ></button>
          </div>

          <h3 className="product-size-title">Size</h3>
          <div className="size-options">
            <button className="size-btn">S</button>
            <button className="size-btn">M</button>
            <button className="size-btn">L</button>
            <button className="size-btn">XL</button>
          </div>
        </div>

        <div className="checkout-container">
          <h2 className="product-price">${price}</h2>
          <p className="product-price-note">Price When Purchased Online</p>
          <p className="product-return-policy">Free 90 Day Returns</p>
          <p className="product-seller">Sold by Stage Fright TM</p>

          <h3 className="quantity-title">Quantity:</h3>
          <Counter />

          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>

      <div className="review_container">
        <h2 
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#fff', 
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          What Our Fans Say
        </h2>
        <ReviewCarousel reviews={reviews} />
      </div>
    </div>
  );
};

export default ProductDetails;