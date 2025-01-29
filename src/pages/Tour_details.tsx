import React, { useState } from 'react';
import { useLocation } from "react-router";
import '../CSS/Tour_details.css'; 
import Footer from "../components/footer";
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
const ProductDetails: React.FC = () => {
    const location = useLocation();
    const { address, place, price, startDate, endDate, mapData } = location.state || {}; 

    
    const [selectedSeats, setSelectedSeats] = useState<boolean[]>(new Array(30).fill(false));

   
    const handleSeatChange = (index: number) => {
        const updatedSeats = [...selectedSeats];
        updatedSeats[index] = !updatedSeats[index]; 
        setSelectedSeats(updatedSeats);
    };


    const totalPrice = selectedSeats.filter(seat => seat).length * price;


    const getSeatLabel = (index: number) => {
        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        const row = rows[Math.floor(index / 10)]; 
        const seatNumber = (index % 10) + 1;      
        return `${row}${seatNumber}`;
    };

    
    return (
      <div>
        
        <div className="tour-opener-container">

          <div className="hero">
            <div className="hero-overlay">
              <h1>Stage Fright Tour</h1>
              <p>Experience an unforgettable night of music at {place}</p>
              
            </div>
          </div>

          <main className='tour-main'>
            <section className='card'>
              <h2>Event Details:</h2>
              <h3 className='event-det'><strong><FaCalendar />Start Date:</strong> {startDate instanceof Date ? startDate.toLocaleDateString() : startDate}</h3>
              <h3 className='event-det'><strong> <FaCalendar />End Date:</strong> {endDate instanceof Date ? endDate.toLocaleDateString() : endDate}</h3>
              <h3 className='event-det'><strong><IoLocationSharp />Address:</strong> {address}</h3>

            </section>
            <section className='card'>
              <h2>Location:</h2>
              <iframe
            src={mapData}
            width="100%"
            height="100%"
            className="map"
            allowFullScreen
            loading="lazy"
          ></iframe>
            </section>

          </main>
          
        </div>



        <div className='center'>
            <div className='tickets'>
                <div className='ticket-selector'>
                    <div className='head'>
                        <div className='title_tour'>Seating at {place}</div>
                    </div>

                    
                    <div className="screen">
                        <div className="screen-text">Concert Stage</div>
                    </div>

            
                    <div className="seats">
                        <div className="status">
                            <div className="item">Available</div>
                            <div className="item">Booked</div>
                            <div className="item">Selected</div>
                        </div>
                        <div className="all-seats">
                            {selectedSeats.map((isSelected, index) => (
                                <div key={index} className="seat-container">
                                    <div 
                                        className={`seat ${isSelected ? 'selected' : ''}`} 
                                        onClick={() => handleSeatChange(index)} 
                                    >
                                        {getSeatLabel(index)} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

              
                    <div className="vip-options">
                        <h3>VIP Pass Options</h3>
                        <div className="vip-item">
                            <input type="checkbox" id="vip1" />
                            <label htmlFor="vip1">VIP Meet and Greet</label>
                        </div>
                        <div className="vip-item">
                            <input type="checkbox" id="vip2" />
                            <label htmlFor="vip2">VIP Backstage Access</label>
                        </div>
                        <div className="vip-item">
                            <input type="checkbox" id="vip3" />
                            <label htmlFor="vip3">VIP Lounge Access</label>
                        </div>
                    </div>
                </div>

               
                <div className="price_tour">
                    <div className="total">
                        <span>
                            <span className='count'>{selectedSeats.filter(seat => seat).length}</span> Tickets
                        </span>
                        <div className="amount">${totalPrice}</div>
                    </div>
                    <button type='button'>Book</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default ProductDetails;