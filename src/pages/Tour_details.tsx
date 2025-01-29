import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router";
import '../CSS/Tour_details.css'; 
import Footer from "../components/footer";
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { get, getDatabase, push, ref } from 'firebase/database';
import { UserContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';
const ProductDetails: React.FC = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const { address, place, price, startDate, endDate, mapData } = location.state || {}; 



    
    interface SeatStatus {
        status: 'booked' | 'selected' | 'none';
    }

    const [bookedSeats, setBookedSeats] = useState<SeatStatus[]>(new Array(30).fill({ status: 'none' }));
    const [meet, setMeet] = useState(false);
    const [backstage, setBackstage] = useState(false);
    const [lounge, setLounge] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        updatePrice();
    }, [bookedSeats, meet, backstage, lounge]);
    useEffect(() => {
        const db = getDatabase();
        const seatsRef = ref(db, `/${place}/`);

        get(seatsRef).then((snapshot: any) => {
            if (snapshot.exists()) {
                const seatsData = snapshot.val();
                const updatedSeats = seatsData.map((seat: boolean) => ({
                    status: seat ? 'booked' : 'none'
                }));
                setBookedSeats(updatedSeats);
            }
        }).catch((error: any) => {
            console.error("Error fetching booked seats:", error);
        });
    }, []);

    const handleSeatChange = (index: number) => {
        const updatedSeats = [...bookedSeats];
        if (updatedSeats[index].status === 'none') {
            updatedSeats[index].status = 'selected';
        } else if (updatedSeats[index].status === 'selected') {
            updatedSeats[index].status = 'none';
        }
        setBookedSeats(updatedSeats);
    };

    const getSeatLabel = (index: number) => {
        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        const row = rows[Math.floor((index) / 10)]; 
        const seatNumber = ((index) % 10) + 1;      
        return `${row}${seatNumber}`;
    };

    const updatePrice = () => { 
        const selectedSeats = bookedSeats.filter(seat => seat.status === 'selected');
        setTotalPrice((selectedSeats.length * price) + (meet ? 50 : 0) + (backstage ? 100 : 0) + (lounge ? 75 : 0));

    }
    
    return (
      <div>
        <ToastContainer />
        
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
            <div className='tickets' style={{overflowX: 'hidden', width: '40%'}}>
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
                        <div className="all-seats" >
                            {bookedSeats.map((seat, index) => (
                                <div key={index} className="seat-container">
                                    <div 
                                        className={`seat ${seat.status}`} 
                                        onClick={() => {handleSeatChange(index)
                                            updatePrice();
                                        }} 
                                    >
                                        {getSeatLabel(index)} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

              
                    <div className="vip-options">
                        <h3>VIP Pass Options</h3>
                        <div className="vip-item" onClick={() => {
                            const checkbox = document.getElementById('vip1') as HTMLInputElement;
                            checkbox.checked = !checkbox.checked;
                            setMeet(checkbox.checked);
                            updatePrice();
                        }}>
                            <input type="checkbox" id="vip1" onChange={(e) => {
                                setMeet(e.target.checked);
                                updatePrice();
                            }} />
                            <label htmlFor="vip1">VIP Meet and Greet</label>
                        </div>
                        <div className="vip-item" onClick={() => {
                            const checkbox = document.getElementById('vip2') as HTMLInputElement;
                            checkbox.checked = !checkbox.checked;
                            setBackstage(checkbox.checked);
                            updatePrice();
                        }}>
                            <input type="checkbox" id="vip2" onChange={(e) => {
                                setBackstage(e.target.checked);
                                updatePrice();
                            }} />
                            <label htmlFor="vip2">VIP Backstage Access</label>
                        </div>
                        <div className="vip-item" onClick={() => {
                            const checkbox = document.getElementById('vip3') as HTMLInputElement;
                            checkbox.checked = !checkbox.checked;
                            setLounge(checkbox.checked);
                            updatePrice();
                        }}>
                            <input type="checkbox" id="vip3" onChange={(e) => {
                                setLounge(e.target.checked);
                                updatePrice();
                            }} />
                            <label htmlFor="vip3">VIP Lounge Access</label>
                        </div>
                    </div>
                </div>

               
                <div className="price_tour">
                    <div className="total">
                        <span>
                            <span>{bookedSeats.filter(seat => seat.status === 'selected').length}</span> Tickets
                        </span>
                        <div className="amount">${totalPrice}</div>
                    </div>
                    <button type='button' onClick={addToCart}>Book</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
      </div>
    );


    function addToCart() {
        const db = getDatabase();
        if (user && user.email) {
            const usersRef = ref(db, "users/" + user.email.replace('.', ',') + "/tours/");
            const selectedSeats = bookedSeats.filter(seat => seat.status === 'selected');
            if (selectedSeats.length === 0) {
                toast.error('You must select at least one seat!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        color: '#E9204F',
                        backgroundColor: '#2C2C2C', 
                    }
                });
                return;
            }

            push(usersRef, {
                place,
                startDate: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
                endDate: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate,
                address,
                realPrice: totalPrice,
                quantity: 1,
                selectedSeats: selectedSeats
                    .map((seat) => bookedSeats.indexOf(seat)),
                backstage,
                lounge,
                meet,
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
                color: '#E9204F', 
                backgroundColor: '#2C2C2C', 
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
                color: '#E9204F', 
                backgroundColor: '#2C2C2C', 
                }
            });
            
            }
            
        }
};

export default ProductDetails;