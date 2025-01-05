import React from 'react';
import {useLocation } from "react-router";
import '../CSS/Product.css';
import Counter from '../components/counter'; 

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const { imageUrl, price, title, description } = location.state || {}; 

  return (
    <div className="product-container">


    <div className="image_container">  
 <img src={imageUrl} alt={title} className="product-image" />
    </div>



<div className="details_container">
      <h2 className="product-title">{title}</h2>
      <p className="product-description">{description}</p>
      
      <div className= "horizontal-line"></div>

<h3 style={{
        fontFamily: 'Copperplate, serif',
        color: 'white',
        marginTop: '10px'}}>Color</h3>
    <div className="circles-container">

      <div className="circles" 
      style={{  
        backgroundColor: '#1A1A1A',
        border: '1px solid white'
        }}> </div>
      
      <div className="circles" 
      style={{  
        backgroundColor: '#D891EF',
        border: ''
        }}> </div>

<div className="circles" 
      style={{  
        backgroundColor: '#FF6B6B',
        border: ''
        }}> </div>

<div className="circles" 
      style={{  
        backgroundColor: '#87CEFA',
        border: ''
        }}> </div>


        

    </div> 

<div>
<h3 style={{
        fontFamily: 'Copperplate, serif',
        color: 'white',
        marginTop: '10px'}}>size</h3>

</div>

<div className='sizes'> 

  <div className='size'>S</div>
  <div className='size'>M</div>
  <div className='size'>L</div>
  <div className='size'>XL</div>

</div>

<div> 
  <Counter/>
</div>

</div>
   

   <div className="price_container"> 

   <p className="product-price">${price}</p>
   <p className='sub1'>Price when purchased online</p>
   <p className='sub2'>Free 90 Day Returns - Sold By Stage Fright TM</p>
   <button className='add-to-cart-button'>Add to Cart</button>
   <div style={{ borderTop: '1px solid white', margin: '10px 0' }}></div>
   <div style={{fontSize: '0.96rem'}} className='sub1'>How do you want your item</div>    

        <div className="delivery_options_container"> 
        
        <div className="options">Shipping</div>
        <div className="options">Pickup</div>
        <div className="options">Delivery</div>
        
        </div>

    </div>
   
    </div>
  );
};

export default ProductDetails;