import React from 'react';
import { redirect, useLocation } from "react-router-dom";
import '../CSS/Product.css';

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const { imageUrl, price, title, description } = location.state || {}; 

  return (
    <div className="product-container">




    <div className="image_container">  
        <img src={imageUrl} alt={title} className="product-image" />
    </div>


        <div className="empty-space-right"></div> 

<div className="details_container">
      <h2 className="product-title">{title}</h2>
      <p className="product-description">{description}</p>
      <p className="product-price">${price}</p>
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


</div>
   

   
    </div>
  );
};

export default ProductDetails;