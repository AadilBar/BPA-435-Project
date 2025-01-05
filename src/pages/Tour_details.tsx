import React from 'react';
import {useLocation } from "react-router";
import '../CSS/Tour_details.css'; 
import ButtonSection from '../components/ButtonSection';  


const ProductDetails: React.FC = () => {
    const location = useLocation();
    const { imageUrl, address, place, price, startDate, endDate, mapData } = location.state || {}; 
  
    return (

        <div className='overall_container'>

            <div className='left_container'> 
    
                <div className='left-top'>

                    <div className='ticket_options'> <h2>Ticket Options</h2> </div>  
                    
                    <ButtonSection></ButtonSection>
                
                </div> 
                
                
                <div className='left-bottom'>
                   
                    <div className='add-ons'>Additional Packages</div>

                    <div className='left-bottom-sub'>

                        <div className='package_image'><img src={`${import.meta.env.BASE_URL}/images/membership.jpg`}  alt="package_image" className='package_image' /></div>
                        <div className='package_name'>Stage Fright All Exclusive Annual VIP Membership</div>
                        <div className='package_price'>$199.99</div>
                        <div className='package_description'> Experience the best with our VIP Club Membership. Enjoy exclusive benefits like priority access to events, premium 
                        seating, personalized services, and luxurious amenities. From complimentary refreshments to valet service, our VIP members receive unparalleled attention
                         and unforgettable experiences. Elevate your social and entertainment journey with exclusive perks designed for your ultimate satisfaction.</div>
                        <div className="membership_button"> <button>Add VIP Membership</button> </div> 
                        
                    </div>
                
                </div>


            </div>

            <div className='right_container'>
                <div className='image'>
                    <img src={imageUrl} alt="image" className="product-image" />
                </div>

                <div className='place'><span style={{ fontWeight: 'bold' }}>Concert:</span> {place}</div>
                <div className='address'><span style={{ fontWeight: 'bold' }}>Location:</span>{address}</div>
                <div className='start_date'><span style={{ fontWeight: 'bold' }}>Start Date:</span> {startDate instanceof Date ? startDate.toLocaleDateString() : startDate}</div>
                <div className='end_date'> <span style={{ fontWeight: 'bold' }}>End Date:</span> {endDate instanceof Date ? endDate.toLocaleDateString() : startDate}</div>
                <div className='price_right'> <span style={{ fontWeight: 'bold' }}>Price:</span>${price}</div>
                <div>  
                    <iframe 
                     src={mapData} 
                        width="100%" 
                        height="100%" 
                        style={{ border: "0", backgroundColor: "white" }}  
                        loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                     className='map'
                        ></iframe>
                </div>  
                <div className='checkout_container'>
                    <button className='checkout'>Proceed To Checkout</button>
                </div>

            </div> 
            

       </div> 
        );
};

export default ProductDetails;