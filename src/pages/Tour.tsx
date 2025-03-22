import EventItem from '../components/event';
import Footer from '../components/footer';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import '../CSS/Tour.css';
export default function Tour() {
    const events = [
        {
            imageUrl: ` /images/Shows/HuntingtonBankPav.png`,
            place: 'Huntington Bank Pavilion',
            address: "1300 S Linn White Dr, Chicago, IL 60605",
            price: 50,
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-06-02'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7420.551380478309!2d-87.61154152339903!3d41.86455426626153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2b7aa5e5a88b%3A0x2b1be8f520a766ba!2s1300%20S%20Linn%20White%20Dr%2C%20Chicago%2C%20IL%2060605!5e1!3m2!1sen!2sus!4v1735970585409!5m2!1sen!2sus"
        },
        {
            imageUrl: ` /images/Shows/Credit1Pav.png`,
            place: 'Credit Union 1 Arena',
            address: "525 S Racine Ave, Chicago, IL 60607",
            price: 50,
            startDate: new Date('2025-06-07'),
            endDate: new Date('2025-06-08'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.591274925742!2d-87.65885062357913!3d41.87467056562848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ce067db1ecd%3A0x73faf6b37b26e279!2s525%20S%20Racine%20Ave%2C%20Chicago%2C%20IL%2060607!5e1!3m2!1sen!2sus!4v1736049280628!5m2!1sen!2sus"
        },
        {
            imageUrl: ` /images/Shows/Credit1Amp.png`,
            place: 'Credit Union 1 Amphitheater',
            address: "19100 Ridgeland Ave, Tinley Park, IL 60477",
            price: 50,
            startDate: new Date('2025-06-14'),
            endDate: new Date('2025-06-15'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.5194221513725!2d-87.77817272359236!3d41.544106886258966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e167c293f99b1%3A0x49ae1068b1696c7e!2sCredit%20Union%201%20Amphitheatre!5e1!3m2!1sen!2sus!4v1736049372248!5m2!1sen!2sus"
        },
        {
            imageUrl: ` /images/Shows/Riviera.png`,
            place: 'Riviera Theatre',
            address: "4746 N Racine Ave, Chicago, IL 60640",
            price: 50,
            startDate: new Date('2025-06-21'),
            endDate: new Date('2025-06-22'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.472809154035!2d-87.66264292357535!3d41.96865595973894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd22cf3dffc5b%3A0xd556d6c6fd599c1!2s4746%20N%20Racine%20Ave%2C%20Chicago%2C%20IL%2060640!5e1!3m2!1sen!2sus!4v1736049447545!5m2!1sen!2sus"
        },
        {
            imageUrl: ` /images/Shows/SaltShed.png`,
            place: 'Salt Shed',
            address: "1357 N Elston Ave, Chicago, IL 60642",
            price: 50,
            startDate: new Date('2025-06-28'),
            endDate: new Date('2025-06-29'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6951.6919951081545!2d-87.66405951057561!3d41.9067366894724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2d83f2fb95b%3A0xce3f70174a3e2799!2s1357%20N%20Elston%20Ave%2C%20Chicago%2C%20IL%2060642!5e1!3m2!1sen!2sus!4v1736049503570!5m2!1sen!2sus"
        },
        {
            imageUrl: ` /images/Shows/UnitedCenter.png`,
            place: 'United Center',
            address: "1901 W Madison St, Chicago, IL 60612",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.259710528626!2d-87.67675642357887!3d41.8807639652469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2d3eb7f6e34d%3A0x1f0cd7161ad43000!2sUnited%20Center%2C%201901%20W%20Madison%20St%2C%20Chicago%2C%20IL%2060612!5e1!3m2!1sen!2sus!4v1736049562523!5m2!1sen!2sus"
        }, 
        {
            imageUrl: ` /images/Shows/GreenMillLounge.jpg`,
            place: 'Green Mill Lounge',
            address: "4802 N Broadway, Chicago, IL 60640",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.073030687888!2d-87.6599222!3d41.969202800000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd22c92322ce7%3A0xe2dc9f64b515c25f!2sThe%20Green%20Mill!5e1!3m2!1sen!2sus!4v1742304581681!5m2!1sen!2sus"
        }, 
        {
            imageUrl: ` /images/Shows/HouseOfBlues.jpg`,
            place: 'House of Blues',
            address: "329 N Dearborn St, Chicago, IL 60654",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.887228253362!2d-87.63113188255612!3d41.888285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2df40450f321%3A0x7dd71d91eeafe444!2sHouse%20of%20Blues%20Restaurant%20%26%20Bar!5e1!3m2!1sen!2sus!4v1742305093826!5m2!1sen!2sus"
        }, 
        {
            imageUrl: ` /images/Shows/KingstonMines.jpg`,
            place: 'Kingston Mines',
            address: "2548 N Halsted St, Chicago, IL 606142",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.9829201819075!2d-87.6490441!3d41.9287006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd305919cbff1%3A0x719a19cc064f264a!2sKingston%20Mines!5e1!3m2!1sen!2sus!4v1742305183282!5m2!1sen!2sus" 
        }, 
        {
            imageUrl: ` /images/Shows/ParkWest.jpg`,
            place: 'Park West',
            address: "322 W Armitage Ave, Chicago, IL 60614",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6014.918812259634!2d-87.63738100000002!3d41.91859099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd36b3c958191%3A0x31056ce4626d33!2sPark%20West!5e1!3m2!1sen!2sus!4v1742305279265!5m2!1sen!2sus" 
        }, 
        {
            imageUrl: ` /images/Shows/ThaliaHall.jpg`,
            place: 'Thalia Hall',
            address: "1807 S Allport St, Chicago, IL 60608",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3265413508657!2d-87.657459!3d41.857717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cffdb62b721%3A0x9a4a94db5d09cf36!2sThalia%20Hall!5e1!3m2!1sen!2sus!4v1742305345945!5m2!1sen!2sus" 
        }, 
        {
            imageUrl: ` /images/Shows/TheHideout.jpg`,
            place: 'The Hideout',
            address: "1354 W Wabansia Ave, Chicago, IL 60642",
            price: 50,
            startDate: new Date('2025-07-05'),
            endDate: new Date('2025-07-06'),
            mapData: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48122.97785617003!2d-87.69751662089845!3d41.91378019999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2de64eab689%3A0x335730d5ca5ebf70!2sThe%20Hideout!5e1!3m2!1sen!2sus!4v1742305439529!5m2!1sen!2sus" 
        }, 
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(() => {
        const fuse = new Fuse(events, {
            keys: ['place', 'address'],
            threshold: 0.45, 
        });

        if (searchQuery.trim() === '') {
            setFilteredEvents(events);
        } else {
            const results = fuse.search(searchQuery).map(result => result.item);
            setFilteredEvents(results);
        }
    }, [searchQuery]);

    return (
        <>
            <div className="tour-intro-container">
                <div className="overlay"></div>
                <div className="overlay-text-container">
                    <h1 className="tour-title">Stage Fright on Tour</h1>
                    <p className="slogan">Experience the Magic Live</p>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by venue or address..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>
            <div className="tour-dates-container">
                <div className="items-container">
                    
    {filteredEvents.length > 0 ? (
        <AnimatePresence>
            {filteredEvents.map((event) => (
                <motion.div
                    key={event.place} 
                    layout
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }} 
                    transition={{ duration: 0.3 }} 
                >
                    <EventItem
                        imageUrl={event.imageUrl}
                        place={event.place}
                        address={event.address}
                        price={event.price}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        mapData={event.mapData}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
    ) : (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
            color: '#ff4d4d',
            fontSize: '3rem',
            fontWeight: 'bold',
            marginTop: '20vh',
            marginBottom: '20vh',
            textAlign: 'center',
            fontFamily: 'Sansation, sans-serif',
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
            }}
        >
            No Events Found
        </motion.div>
    )}
                </div>
            </div>
            <br />
            <Footer />
        </>
    );
}



const globalStyles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }



    .search-input:focus {
        border-color: #ff4d4d;
    }

    @media (max-width: 768px) {
      .tour-intro-container {
        height: 60vh;
      }
      .tour-title {
        font-size: 40px;
        letter-spacing: 10px;
      }
      .slogan {
        font-size: 18px;
      }
      .tour-dates-title {
        font-size: 30px;
      }
      .items-container {
        flex-direction: column;
        gap: 10px;
      }
    }

    @media (max-width: 480px) {
      .tour-title {
        font-size: 32px;
        letter-spacing: 5px;
      }
      .slogan {
        font-size: 16px;
      }
      .tour-dates-title {
        font-size: 24px;
      }
    }
`;

export { globalStyles };