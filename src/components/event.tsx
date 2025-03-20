import './event.css';
import { Link } from 'react-router';
import { motion } from "framer-motion"; 
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

interface EventProps {
    imageUrl: string;
    place: string;
    address: String;
    price: number;
    startDate: Date;
    endDate: Date;
    mapData: string;
}

const EventItem: React.FC<EventProps> = ({ imageUrl, place, address, price, startDate, endDate, mapData }) => {
  return (
    <Link 
      to="/tour_details" 
      className="item-link" 
      state={{ imageUrl, place, address, price, startDate, endDate, mapData}} 
      onClick={() => window.scrollTo(0, 0)}
    >

    
      <motion.div
        className="card_outline"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }} 
        viewport={{ once: true, amount: 0.2 }}
       
      >
        <div className="tour_img">
          <img src={imageUrl} alt="tour picture" className="tour_img" />
          <div className="tour_overlay">{place}</div>
        </div>

        <div className="tour_details">
          <p className="tour_date"><strong><FaCalendar /> {startDate.toDateString()}</strong> </p>
          <p className="tour_price">Starting at ${price}</p>
          <p className="tour_address"><strong><IoLocationSharp />{address}</strong></p>

          <button className="tour_button">Get Tickets</button>
        </div>
      </motion.div>
      
    </Link>
  );
};

export default EventItem;