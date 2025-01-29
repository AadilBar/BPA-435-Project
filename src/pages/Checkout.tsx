import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import '../CSS/Product.css';


import 'react-toastify/dist/ReactToastify.css';
import ReviewCarousel from '../components/review';
import { StepperInput } from '../components/ui/stepper-input';
import { getDatabase, push, ref } from 'firebase/database';
import { UserContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';

const ProductDetails: React.FC = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { imageUrl, price, title, description, orange, blue, black, grey } = location.state || {};

  const [selectedColor, setSelectedColor] = useState<string[]>(black || []);
  const [mainImage, setMainImage] = useState<string>(selectedColor[0] || imageUrl);


  const [color, setcolor] = useState<string>('black');
  const [Size, setSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  const handleColor = (color: string[], colorName: string) => {
    setSelectedColor(color);
    setMainImage(color[0]); // Set the first image of the selected color as the main image
    setcolor(colorName); // Track the selected color button
  };

  const reviews = [
    {
      imageUrl: `${import.meta.env.BASE_URL}/images/review1.jpg`,
      name: 'David Weis',
      rating: 5,
      description: '“I’ve never been more impressed with a product – it works perfectly and looks amazing!”',
    },
    {
      imageUrl: `${import.meta.env.BASE_URL}/images/review2.jpg`,
      name: 'John Doe',
      rating: 5,
      description: '“This product has completely exceeded my expectations, offering both quality and great value.”',
    },
    {
      imageUrl: `${import.meta.env.BASE_URL}/images/review3.jpg`,
      name: 'Jane Smith',
      rating: 5,
      description: '“I can’t believe how much this has improved my daily routine – truly a game-changer!”',
    },
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      <ToastContainer />
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

          {title && !title.toLowerCase().includes('vinyl') && !title.toLowerCase().includes('candle') && !title.toLowerCase().includes('sticker') && !title.toLowerCase().includes('bag') && !title.toLowerCase().includes('socks') && (
            <>
              <h3 className="product-color-title">Color</h3>
              <div className="color-options">
                <button 
                  className={`color-btn ${color === 'black' ? 'selected' : ''}`} 
                  style={{ backgroundColor: '#010B13' }} 
                  onClick={() => handleColor(black, 'black')}
                ></button>
                <button 
                  className={`color-btn ${color === 'grey' ? 'selected' : ''}`} 
                  style={{ backgroundColor: '#bac2bc' }} 
                  onClick={() => handleColor(grey, 'grey')}
                ></button>
                <button 
                  className={`color-btn ${color === 'orange' ? 'selected' : ''}`} 
                  style={{ backgroundColor: '#FF4500' }} 
                  onClick={() => handleColor(orange, 'orange')}
                ></button>
                <button 
                  className={`color-btn ${color === 'blue' ? 'selected' : ''}`} 
                  style={{ backgroundColor: '#225b9c' }} 
                  onClick={() => handleColor(blue, 'blue')}
                ></button>
              </div>
            </>
          )}
          {title && !title.toLowerCase().includes('vinyl') && !title.toLowerCase().includes('candle') && !title.toLowerCase().includes('sticker') && !title.toLowerCase().includes('bag') && !title.toLowerCase().includes('phone') && (
            <>
              <h3 className="product-size-title">Size</h3>
              <div className="size-options">
                <button 
                  className="size-btn" 
                  style={{ 
                    fontWeight: Size === 'S' ? 'bold' : 'normal',
                    outline: Size === 'S' ? 'none' : '',
                    boxShadow: Size === 'S' ? '0 0 0 2px #FF6B6B' : ''
                  }}
                  onClick={() => setSize('S')}
                >
                  S
                </button>
                <button 
                  className="size-btn" 
                  style={{ 
                    fontWeight: Size === 'M' ? 'bold' : 'normal',
                    outline: Size === 'M' ? 'none' : '',
                    boxShadow: Size === 'M' ? '0 0 0 2px #FF6B6B' : ''
                  }}
                  onClick={() => setSize('M')}
                >
                  M
                </button>
                <button 
                  className="size-btn" 
                  style={{ 
                    fontWeight: Size === 'L' ? 'bold' : 'normal',
                    outline: Size === 'L' ? 'none' : '',
                    boxShadow: Size === 'L' ? '0 0 0 2px #FF6B6B' : ''
                  }}
                  onClick={() => setSize('L')}
                >
                  L
                </button>
                <button 
                  className="size-btn" 
                  style={{ 
                    fontWeight: Size === 'XL' ? 'bold' : 'normal',
                    outline: Size === 'XL' ? 'none' : '',
                    boxShadow: Size === 'XL' ? '0 0 0 2px #FF6B6B' : ''
                  }}
                  onClick={() => setSize('XL')}
                >
                  XL
                </button>
              </div>
            </>
          )}
        </div>

        <div className="checkout-container">
          <h2 className="product-price">${price}</h2>
          <p className="product-price-note">Price When Purchased Online</p>
          <p className="product-return-policy">Free 90 Day Returns</p>
          <p className="product-seller">Sold by Stage Fright TM</p>

          <h3 className="quantity-title">Quantity:</h3>
          <div>
            <StepperInput defaultValue={'1'} onValueChange={({ value }: { value: string }) => setQuantity(Math.max(1, Number(value)))} value={quantity.toString()}/>
          </div>

          <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
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


  function addToCart() {
    const db = getDatabase();
    if (user && user.email) {
      const usersRef = ref(db, "users/" + user.email.replace('.', ',') + "/cart/");
      const modifiedImageUrl = mainImage.split('/').slice(2).join('/');
      push(usersRef, {
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