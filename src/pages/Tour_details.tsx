import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { motion } from "framer-motion"; 
import '../CSS/Tour_details.css'; 
import Footer from "../components/footer";
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { get, getDatabase, push, ref, runTransaction } from 'firebase/database';
import { UserContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';

const ProductDetails: React.FC = () => {
    const { user } = useContext(UserContext);
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
    };

    function addToCart() {
        const db = getDatabase();
        if (user && user.email) {
            const usersRef = ref(db, "users/" + user.email.replace('.', ',') + "/tours/items");
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
                    style: { color: '#E9204F', backgroundColor: '#2C2C2C' }
                });
                return;
            }
            push(usersRef, {
                place,
                startDate: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
                endDate: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate,
                address,
                realPrice: totalPrice,
                quantity: bookedSeats.filter(seat => seat.status === 'selected').length,
                selectedSeats: selectedSeats
                    .map((seat) => bookedSeats.indexOf(seat)),
                backstage,
                lounge,
                meet,
            });

            const totalItemsRef = ref(db, "users/" + user.email.replace('.', ',') + "/tours/totalItems");
                runTransaction(totalItemsRef, (currentValue) => {
                return (currentValue || 0) + 1;
            });
            toast.success(`${place} has been added to your cart!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: { color: '#E9204F', backgroundColor: '#2C2C2C' }
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
                style: { color: '#E9204F', backgroundColor: '#2C2C2C' }
            });
        }
    }

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };


    

    return (
        <div>
            <ToastContainer />
            <motion.div
                className="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="hero-overlay">
                    <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
                        Stage Fright Tour
                    </motion.h1>
                    <motion.p initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
                        Experience an unforgettable night of music at {place}
                    </motion.p>
                </div>
            </motion.div>
            <main>
                <motion.div
                    className="tour-main"
                
                    initial="hidden"
                    animate="visible"
                >
                    <div className="left-container">
                        <motion.section className='card' variants={fadeIn}>
                            <h2>Event Details</h2>
                            <p className='event-det'><strong><FaCalendar /> Start Date:</strong> {startDate instanceof Date ? startDate.toLocaleDateString() : startDate}</p>
                            <p className='event-det'><strong><FaCalendar /> End Date:</strong> {endDate instanceof Date ? endDate.toLocaleDateString() : endDate}</p>
                            <p className='event-det'><strong><IoLocationSharp /> Address:</strong> {address}</p>
                        </motion.section>
                        <motion.section className='card' variants={fadeIn}>
                            <h2>Location</h2>
                            <iframe
                                src={mapData}
                                width="100%"
                                height="300"
                                className="map"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </motion.section>
                    </div>
                    <div className="right-container">
                        <motion.section className='card' variants={fadeIn}>
                            <h2>Ticketing</h2> 
                            <div className='tickets'>
                                <div className='ticket-selector'>
                                    <div className='head'>
                                        <div className='title_tour'>Seating at {place}</div>
                                    </div>
                                    <div className="screen">
                                        <div className="screen-text">Concert Stage</div>
                                    </div>
                                    <motion.div
                                       className="seats"
                                  
                                       initial="hidden"
                                       whileInView="visible"
                                       viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <div className="status">
                                            <div className="item">Available</div>
                                            <div className="item">Booked</div>
                                            <div className="item">Selected</div>
                                        </div>
                                        <div className="all-seats">
                                            {bookedSeats.map((seat, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="seat-container"
                                                    variants={fadeIn}
                                                >
                                                    <div
                                                        className={`seat ${seat.status}`}
                                                        onClick={() => {
                                                            handleSeatChange(index);
                                                            updatePrice();
                                                        }}
                                                    >
                                                        {getSeatLabel(index)}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
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
                                            <label htmlFor="vip1">VIP Meet and Greet - $50</label>
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
                                            <label htmlFor="vip2">VIP Backstage Access - $100</label>
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
                                            <label htmlFor="vip3">VIP Lounge Access - $75</label>
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
                        </motion.section>
                    </div>
                </motion.div>
                <motion.section className='card' variants={fadeIn}>
                    <h2>Event Rules / FAQ</h2>
                    <div className="faq-list">
                        <div className="faq-item">
                            <h3>What time do the doors open?</h3>
                            <p>Doors open at 6:00 PM.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Are there any age restrictions?</h3>
                            <p>This event is open to all ages.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Can I bring my own food and drinks?</h3>
                            <p>Outside food and drinks are not permitted. Concessions will be available inside the venue.</p>
                        </div>
                        <div className="faq-item">
                            <h3>What is the refund policy?</h3>
                            <p>All sales are final. No refunds or exchanges unless the event is canceled.</p>
                        </div>
                    </div>
                </motion.section>
                <motion.section className='card' variants={fadeIn}>
                    <h2 style={{ color: '#ff6347'}}>Accessibility Information</h2>
                    <div style={{ backgroundColor: '#222222', borderRadius: '8px', padding: '16px' }}>
                        <p style={{fontSize: "1.3rem", fontWeight: 'bolder'}}>We strive to make our events accessible to everyone. Available features include:</p>
                        <ul>
                            <li>  - Wheelchair accessible seating and restrooms</li>
                            <li>  - Sign language interpreters available upon request</li>
                            <li>  - Assistive listening devices</li>
                            <li>  - Service animals welcome</li>
                        </ul>
                    </div>
                </motion.section>
                <motion.section className='card' variants={fadeIn}>
                    <h2 style={{ color: '#ff6347' }}>Event Sponsors</h2>
                    <div className="sponsor-logos">
                        <img src="/images/sponsor1.png" alt="Sponsor 1" />
                        <img src="/images/sponsor2.png" alt="Sponsor 2" />
                        <img src="/images/sponsor3.png" alt="Sponsor 3" />
                    </div>
                </motion.section>
               
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;