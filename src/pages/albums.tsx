import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../CSS/albumsPage.css';
import ThreeDAlbums from '../components/3dAlbums';
gsap.registerPlugin(ScrollTrigger); 
import '../CSS/albumCard.css'; 
import Footer from '../components/footer';
import AlbumCard from '../components/albumCard';
import 'swiper/css/pagination';
import Awards from '../components/awards';
import { FaTrophy } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { GiMedal } from "react-icons/gi";
import { PiMedalFill } from "react-icons/pi";
import { GiLaurelsTrophy } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { VscRuby } from "react-icons/vsc";
const Albums: React.FC = () => {
   const horizontalRef = useRef<HTMLDivElement>(null);
   const titleRef = useRef<HTMLDivElement>(null);
   const VerticalRef = useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = useState<number>(0);
    useEffect(() => {
        if (VerticalRef.current) {
            const calculatedHeight = (VerticalRef.current.scrollHeight - 100) / 6;
            setCardHeight(calculatedHeight); // Store the calculated height in state
        }
    }, []);
   const albums = [
    {
      imageUrl: ` /images/Merch/Vinyls/upcoming1.png`,
      title: 'Harmonic Ghosts',
      date: 'May 15, 2024',
      duration: 42,
      tracks: 12,
    },
    {
      imageUrl: ` /images/Merch/Vinyls/upcoming2.jpg`,
      title: 'Midnight Echoes',
      date: 'June 16, 2024',
      duration: 45,
      tracks: 12,
    },
    {
      imageUrl: ` /images/Merch/Vinyls/upcoming3.jpg`,
      title: 'Echoes of Silence',
      date: 'July 17, 2024',
      duration: 38,
      tracks: 10,
    },
  ];
  const isMobile = window.innerWidth <= 768;
  useEffect(() => {
    
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

   
    if (horizontalRef.current) {
        const container = horizontalRef.current.querySelector('.horizontal-scroll-container') as HTMLElement;
        const containerWidth = container.scrollWidth;
        const buffer = 150;

        gsap.to(container, {
            x: () => -(containerWidth - window.innerWidth + buffer),
            ease: 'none',
            scrollTrigger: {
            trigger: titleRef.current,
            start: 'top-=80 top',
            end: () => `+=${containerWidth + buffer}`,
            scrub: true,
            pin: true,
            markers: false,
            },
        });
    }
    if (VerticalRef.current && !isMobile) {
        const container = VerticalRef.current.scrollHeight; 
        const buffer = (VerticalRef.current.scrollHeight)/6;
        
        gsap.to(".upcoming-albums-right", {
            y: () => -(container) + buffer,
            ease: "none",
            scrollTrigger: {
            trigger: ".upcoming-albums-content",
            start: "top center",
            endTrigger: ".upcoming-albums-content",
            end: `bottom+=${buffer} center`, 
            scrub: true,
            pin: ".upcoming-albums-section", 
            markers: false, 
            }
        });
    }

    gsap.to(".whats-next-text", {
        backgroundPosition: "0% 0",
        duration: 1,
        scrollTrigger: {
            trigger: ".whats-next-section",
            start: "top center",
            endTrigger: ".whats-next-text",
            end: "bottom center",
            toggleActions: "play none none reverse",
            scrub: true,
        }
    });


    
    return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    
}, []);

   return (
       <div className="albums-page-container">
           {/* Hero Section */}
           <div className="hero-section">
               <img className="background-image" src="/images/Contact/C8.jpg" alt="Background" />
               <h1>Experience Stage Fright Music</h1>
           </div>

           {/* Horizontal Scrolling Section */}

          
         <div ref={titleRef} style={{ background: 'linear-gradient(to right, black, #111)' }}>
            <h1 className="award-title">Crowning Achievements</h1>
          
           <div className="horizontal-scroll-section" ref={horizontalRef}>
                
               
               <div className="horizontal-scroll-container">
                
                  <Awards 
                  icon={FaTrophy}
                  award_name = "Best Rock Album"
                    year = {2024}
                    award_place = "Grammy Awards"
                  
                  />
                   <Awards 
                  icon={FaStar}
                  award_name = "Platinum Record"
                    year = {2022}
                    award_place = "RIAA Certification"
                  
                  /><Awards 
                  icon={PiMedalFill}
                  award_name = "Best Live Performance"
                    year = {2023}
                    award_place = "Music Awards"
                  
                  /><Awards 
                  icon={FaMedal}
                  award_name = "Song of the Year"
                    year = {2023}
                    award_place = "Billboard Music Awards"
                  
                  /><Awards 
                  icon={GiLaurelsTrophy}
                  award_name = "Tour of the Year"
                    year = {2022}
                    award_place = "Global Music Honors"
                  
                  /><Awards 
                  icon={IoDiamond}
                  award_name = "Best Rock Band"
                    year = {2024}
                    award_place = "Grammy Awards"
                  
                  /><Awards 
                  icon={VscRuby}
                  award_name = "Album of the Year"
                    year = {2023}
                    award_place = "American Music Awards"
                  
                  /><Awards 
                  icon={GiMedal}
                  award_name = "Hit of the Summer"
                    year = {2025}
                    award_place = "People's Choice Awards"
                  
                  />
               </div>
               </div> 
           </div>

           {/* Parallax Section */}
           <div
               className="parallax-section"
               style={{ backgroundImage: "url('/images/album-page-sub.jpg')" }}
           >
               Feel the Music
           </div>

           {/* 3D Albums Section */}
           <div className='threeD-albumsPage-container' style={{ background: 'linear-gradient(to bottom, #111, black)' }}> 
               <h1 className='threeD-albumsPage-title'>Our Latest Releases</h1>
               <ThreeDAlbums />
           </div>
          
           {/* Whats Next Section */}
           <div className="whats-next-section" style={{ background: 'linear-gradient(to bottom, #111, black)' }}>
               <h2 className="whats-next-text">Coming This Summer</h2>
           </div>

        {/* Upcoming Albums Section */}

        {!isMobile ? (
            <div className="upcoming-albums-section">
                <div className='upcoming-albums-left' style={{ alignSelf: 'flex-start' }}>
                    Upcoming Albums
                </div>
                <div className='upcoming-albums-right'>
                    <div className='upcoming-albums-content' ref={VerticalRef}>
                        {albums.map((album, index) => (
                            <AlbumCard
                                key={index}
                                imageUrl={album.imageUrl}
                                title={album.title}
                                date={album.date}
                                duration={album.duration}
                                tracks={album.tracks}
                            />
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div className="upcoming-albums-mobile">
                <h2 className='upcoming-albums-left'>Upcoming Albums</h2>
                <div className="upcoming-albums-list">
                    {albums.map((album, index) => (
                        <AlbumCard
                            key={index}
                            imageUrl={album.imageUrl}
                            title={album.title}
                            date={album.date}
                            duration={album.duration}
                            tracks={album.tracks}
                        />
                    ))}
                </div>
            </div>
        )}

        {/* Footer Section */}
        <div className='testx' style={{ marginTop: cardHeight}}> 
            <Footer />
        </div>
              
           
       </div>
   );
};

export default Albums;



