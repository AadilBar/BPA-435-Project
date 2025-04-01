import Footer from '../components/footer';
import '../CSS/Home.css';
import 'swiper/css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TwitterEmbed from '../components/twitter';
import { getDatabase, ref, get } from 'firebase/database';
import { Link as RouterLink } from 'react-router';
gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function Home() {
 const [activeCategory, setActiveCategory] = useState(0);

 useEffect(() => {
   const words = ['Excitement', 'Thrill', 'Adventure', 'Emotion', 'Passion', 'Energy', 'Inspiration', 'Joy'];
   let tlMaster = gsap.timeline({ repeat: -1 });
   words.forEach((word) => {
     let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
     tlText.to('.home-page-tour-typewriter', { text: word, duration: 1, color: 'red' });
     tlMaster.add(tlText);
   });
 }, []);

 const [storeItems, setStoreItems] = useState<ItemArray[]>([]);
 type ItemArray = {
   imageUrl: string;
   price: number;
   title: string;
   description: string;
   category:
     | 'Vinyl'
     | 'Hoodies'
     | 'T-Shirts'
     | 'Tank Top'
     | 'Stickers'
     | 'Candle'
     | 'Phone Case'
     | 'Hat'
     | 'Bag'
     | 'Socks';
   orange?: string[];
   blue?: string[];
   black?: string[];
   grey?: string[];
 };

 useEffect(() => {
   const database = getDatabase();
   const categoryPath = `/Merch/${activeCategory}/black`;
   const cartRef = ref(database, categoryPath);

   get(cartRef)
     .then((snapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         const items: ItemArray[] = [data[0], data[3]] // lol these were the "good images"
           .filter(Boolean)
           // Ok I just put random stuff for the price, title, description, and category. -- Shouldn't matter because I only want image
           .map((item, index) => ({
             imageUrl: item,
             price: 0,
             title: `Item ${index + 1}`,
             description: '',
             category: 'Hoodies',
           }));
         setStoreItems(items);
       } else {
         setStoreItems([]);
       }
     })
     .catch((error) => {
       console.error(error);
     });
 }, [activeCategory]); // Re-run the effect whenever activeCategory changes

 // GSAP ScrollTrigger animations for elements with .animate-on-scroll
 useEffect(() => {
   gsap.utils.toArray('.animate-on-scroll').forEach((elem) => {
     gsap.fromTo(
       elem as HTMLElement,
       { opacity: 0, y: 50 },
       {
         opacity: 1,
         y: 0,
         scrollTrigger: {
           trigger: elem as HTMLElement,
           start: 'top 80%',
           toggleActions: 'play none none none'
         },
         duration: 0.6
       }
     );
   });
 }, []);

 return (
   <div className="home-page-container">
     {/* Hero Section */}
     <div className="home-page-hero">
       <div className="home-page-hero-overlay">
       </div>
     </div>
     
     {/* Tour Section */}
     <div className="home-page-tour-container animate-on-scroll">
       <h2 className="tour-title">
         Experience the <br />
         <span className="home-page-tour-typewriter"></span>
       </h2>
       <div className="tour-stats">
         <div className="tour-stat">
           <h3>500+</h3>
           <p>Shows Performed</p>
         </div>
           <div className="tour-stat">
           <h3>$10,000+</h3>
           <p>Donated to Charity</p>
           </div>
           <div className="tour-stat">
           <h3>20+</h3>
           <p>Local Venues Played</p>
           </div>
       </div>
       <div className="tour-boxes">
           <div className="tour-box animate-on-scroll">
             <h3>Local Tour</h3>
             <p>Catch us live at your favorite local venues and community events.</p>
           </div>
           <div className="tour-box animate-on-scroll">
             <h3>Regional Tour</h3>
             <p>Join us as we perform across neighboring towns and cities.</p>
           </div>
           <div className="tour-box animate-on-scroll">
             <h3>Statewide Tour</h3>
             <p>Experience the music as we tour across the state, bringing joy to every corner.</p>
           </div>
       </div>
       <RouterLink to="/tour">
       <button className="see-tours-button">See Tours</button>
       </RouterLink>
     </div>

    {/* Record and Tour Section */}
    <div className="record-tour-section">
      <div className="record-column animate-on-scroll">
        {/* Latest Album Header */}
        <div className="record-header">
          <h2 className="record-title">Latest Album</h2>
          <RouterLink to="/albums">
          <button className="see-all-button">See All</button>
          </RouterLink>
        </div>
        <div className="record2-card animate-on-scroll">
       <div className="record-card-image">
         {/* Placeholder image for record */}
         <img src="/images/Merch/Vinyls/home-soaring.png" alt="Record Cover" />
       </div>
       <div className="record-card-details">
         <h3 className="record2-name" style={{ marginBottom: '0px' }}>Soaring</h3>
         <div className="record-rating">★★★★★</div>
         <div className="record-award">Grammy Nominated</div>
         <p className="record-description">
        Awarded Best Record of the Year
         </p>
       </div>
        </div>

         <h3 className="previous-releases-title">What Fans Have to Say</h3>
         <div className="previous-releases">
             <div className="release-box animate-on-scroll">
             <TwitterEmbed tweetText="Yes it's finally out! Another Hit that doesn't miss!" author="Aadil Brakat" tweetUrl="https://platform.twitter.com/widgets.js" date="April 1, 2025" profilePic="/images/Home/People/pfp1.jpg" />
             </div>
             <div className="release-box animate-on-scroll">
             <TwitterEmbed tweetText='Love this album! The tracks are so inspiring!' author='Liam Johnson' tweetUrl="https://platform.twitter.com/widgets.js" date="April 1, 2025" profilePic="/images/Home/People/pfp2.jpg" />
             </div>
             <div className="release-box animate-on-scroll">
             <TwitterEmbed tweetText='This is exactly what I needed. The music speaks to my soul.' author='Ethan Brown' tweetUrl="https://platform.twitter.com/widgets.js" date="April 2, 2025" profilePic="/images/Home/People/pfp3.jpg"/>
             </div>
             <div className="release-box animate-on-scroll">
             <TwitterEmbed tweetText='This album is a huge masterpiece. Can’t stop listening!' author='Noah Wilson' tweetUrl="https://platform.twitter.com/widgets.js" date="April 3, 2025" profilePic="/images/Home/People/pfp4.jpg"/>
             </div>
         </div>

       </div>
       <div className="tour-column">
         <div className="tour-column-sub">
           <div className="tour-header">
             <h2>United Center</h2>
             <h3>Chicago, IL</h3>
           </div>
           <div className="tour-footer">
             <h5>July 4, 2025</h5>
             <RouterLink to="/tour">
             <button>Get Tickets</button>
             </RouterLink>
           </div>
         </div>
       </div>
     </div>

     {/* Merch Section */}
     <div className="home-page-merch-container animate-on-scroll">
       <h2 className="merch-title">Explore Our Merchandise</h2>
       {/* Mobile: grid layout for merch buttons applied via CSS */}
       <div className="merch-options">
           <button
           onClick={() => setActiveCategory(0)}
           style={{ color: activeCategory === 0 ? 'black' : 'white', backgroundColor: activeCategory === 0 ? '#ff4d4d' : '#333' }}
           className="home-page-merch-button"
           >
           Hoodies
           </button>
           <button
           onClick={() => setActiveCategory(1)}
           style={{ color: activeCategory === 1 ? 'black' : 'white', backgroundColor: activeCategory === 1 ? '#ff4d4d' : '#333' }}
           className="home-page-merch-button"
           >
           Shirts
           </button>
           <button
           onClick={() => setActiveCategory(2)}
           style={{ color: activeCategory === 2 ? 'black' : 'white', backgroundColor: activeCategory === 2 ? '#ff4d4d' : '#333' }}
           className="home-page-merch-button"
           >
           Tank Tops
           </button>
           <button
           onClick={() => setActiveCategory(3)}
           style={{ color: activeCategory === 3 ? 'black' : 'white', backgroundColor: activeCategory === 3 ? '#ff4d4d' : '#333' }}
           className="home-page-merch-button"
           >
           Caps
           </button>
           <RouterLink to="/store">
           <button
           className="home-page-merch-button"
           >
           See All
           </button>
           </RouterLink>
       </div>
       <div className="merch-boxes">
         {storeItems.map((item, index) => (
           <div key={index} className="merch-box animate-on-scroll">
             <img src={item.imageUrl} alt={item.title} style={{borderRadius: "16px"}} />
           </div>
         ))}
       </div>
     </div>
     <Footer />
   </div>
 );
}

