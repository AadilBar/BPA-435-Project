import React, { useContext, useState } from 'react';
import {useLocation } from "react-router";
import '../CSS/Tour_details.css'; 
import { UserContext } from '../App';
import { getDatabase, ref, set } from 'firebase/database';
import { StepperInput } from '../components/ui/stepper-input';
import { toast, ToastContainer } from 'react-toastify';


const ProductDetails: React.FC = () => {
    const { user } = useContext(UserContext);

    const location = useLocation();
    const { imageUrl, address, place, price, startDate, endDate, mapData } = location.state || {}; 

    const [selectedButton, setSelectedButton] = useState<string>("Back-Row");
    const [quantity, setQuantity] = useState(1);
    const [vipAdded, setVipAdded] = useState(false);
    const [realPrice, setRealPrice] = useState(price);

    const handleClick = (id: string) => {
        setSelectedButton(id);
        if (id === 'Back-Row') {
            setRealPrice(price);
        } else if (id === 'Middle-Row') {
            setRealPrice(price * 1.5);
        } else if (id === 'Up Close and Personal') {
            setRealPrice(price * 2);
        }
      };

    const handleAddVip = () => {
        setVipAdded(!vipAdded);
        if (vipAdded) {
            setRealPrice(realPrice - 399.99);
        } else {
            setRealPrice(realPrice + 399.99);
        }
    }
    
  
    return (

        <div className='overall_container'>
          <ToastContainer/>

            <div className='left_container'> 
    
                <div className='left-top'>

                    <div className='ticket_options'> <h2>Ticket Options</h2> </div>  

                    <div className='left-top-sub'>
      <button 
        className={`ltsp ${selectedButton === 'Back-Row' ? 'selected' : ''}`} 
        onClick={() => handleClick('Back-Row')}
      >
        <div className='price_title'>
          Back-Row
        </div>
        <div className='price_description'>
          Enjoy the music without breaking the bank! Back-row seats are the most affordable option, 
          perfect for those who want to soak in the concert atmosphere while staying within budget. 
          These seats still offer a great view of the stage, along with the collective energy of the crowd. 
          Ideal for casual fans or those looking for an economical way to experience live music, the back-row 
          seats ensure you don’t miss out on the fun.
        </div>
        <div className='counter'></div>
      </button>

      <button 
        className={`ltsp ${selectedButton === 'Middle-Row' ? 'selected' : ''}`} 
        onClick={() => handleClick('Middle-Row')}
      >
        <div className='price_title'>
          Middle-Row
        </div>
        <div className='price_description'>
          The fan favorite! Middle-row seats strike the perfect balance between price and proximity, offering 
          an immersive experience with a fantastic view of the stage. Positioned at the heart of the action, 
          these seats allow you to feel connected to both the artist and the audience. A popular choice for 
          good reason, these seats often sell out quickly, so be sure to grab yours before they’re gone!
        </div>
        <div className='counter'></div>
      </button>

      <button 
        className={`ltsp ${selectedButton === 'Up Close and Personal' ? 'selected' : ''}`} 
        onClick={() => handleClick('Up Close and Personal')}
      >
        <div className='price_title'>
          Up Close and Personal
        </div>
        <div className='price_description'>
          Get ready for an unforgettable concert experience with the Up Close and Personal seats! These premium spots
          provide the best view, placing you right near the stage for an intimate, face-to-face encounter with the artist. 
          With limited availability, this exclusive option ensures a memorable night with an unmatched perspective. Perfect
          for passionate fans and those seeking lifelong memories, these seats are a must for true music lovers.
        </div>
        <div className='counter'></div>
      </button>
    </div>
                </div> 
                
                
                <div className='left-bottom'>
                   
                    <div className='add-ons'>Additional Packages</div>

                    <div className='left-bottom-sub'>

                        <div className='package_image'><img src={`${import.meta.env.BASE_URL}/images/membership.jpg`}  alt="package_image" className='package_image' /></div>
                        <div className='package_name'>Stage Fright All Exclusive VIP Pass</div>
                        <div className='package_price'>$399.99</div>
                        <div className='package_description'> Experience the best with our VIP Club Membership. Enjoy exclusive benefits like priority access to events, premium 
                        seating, personalized services, and luxurious amenities. From complimentary refreshments to valet service, our VIP members receive unparalleled attention
                         and unforgettable experiences. Elevate your social and entertainment journey with exclusive perks designed for your ultimate satisfaction.</div>
                             <button onClick={handleAddVip} className='membership_button'>
                                 {vipAdded ? 'Remove VIP Membership' : 'Add VIP Membership'}
                             </button> 

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
                        <div>
                          <span>Quantity:</span>
                          <StepperInput defaultValue={'1'} onValueChange={({ value }: { value: string }) => setQuantity(Number(value))} />
                        </div>
                <div className='price_right'> 
                    <span style={{ fontWeight: 'bold' }}>Price:</span>
                    ${realPrice}
                </div>
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
                    <button className='checkout' onClick={addToCart}>Add to Cart</button>
                </div>

            </div> 
            

       </div> 
        );


        function addToCart() {
        const db = getDatabase();
        if (user && user.email) {
            const usersRef = ref(db, "users/" + user.email.replace('.', ',') + "/tours/" + place);
            const modifiedImageUrl = imageUrl.split('/').slice(2).join('/');
            set(usersRef, {
            place,
            startDate: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
            endDate: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate,
            address,
            imageUrl: modifiedImageUrl,
            realPrice,
            quantity: quantity
            });
            toast.success(`${place} has been added to your cart!`, {
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