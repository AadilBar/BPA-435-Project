import { Button } from '@chakra-ui/react';
import { Link } from 'react-router'; 
import FlipCard from '../components/flipcard';
import AlbumCard from '../components/albumCard';
import Footer from '../components/footer';
import ThreeDAlbums from '../components/3dAlbums';
import { FaQuestion } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { GiGuitar } from "react-icons/gi";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../CSS/albumCard.css'; 
export default function Home() {
 
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

  return (
    <div>
   
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <img
          src={`/images/Stage_Fright_Main_Page_Image.png`}
          alt="Home Screen Image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

  
      <motion.div
        className="threed-intro-title"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Newest Stage Fright Albums
      </motion.div>

      <div>
        <ThreeDAlbums />
      </div>

      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#09090b',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <motion.h1
          style={{
            fontFamily: 'Sansation',
            color: 'white',
            fontSize: '50px',
            fontWeight: '700',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Experience Stage Fright
        </motion.h1>

        <Link to={'/tour'} onClick={() => window.scrollTo(0, 0)}>
          <Button
            variant="solid"
            p={2}
            fontFamily={'Sansation'}
            fontWeight={'700'}
            fontSize={15}
          >
            View All
          </Button>
        </Link>

        <div style={{ height: '50px' }}></div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            width: '100%',
            padding: '0 5%',
            justifyItems: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <FlipCard
              frontside_imageUrl={` /images/flipcards/front1.jpg`}
              icon={FaQuestion}
              frontside_title="Rock Fact"
              inside_title="Did you Know?"
              inside_imageUrl={` /images/flipcards/front1.jpg`}
              inside_description="Our first jam session was in a garage!"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FlipCard
              frontside_imageUrl={` /images/flipcards/front2.jpg`}
              icon={FaTshirt}
              frontside_title="Exciting News"
              inside_title="New Merch!"
              inside_imageUrl={` /images/flipcards/front2.jpg`}
              inside_description="Shop Stage Fright by checking out our new hoodies in the Store Page!"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FlipCard
              frontside_imageUrl={` /images/flipcards/front3.jpg`}
              icon={GiGuitar}
              frontside_title="Feel the Energy"
              inside_title="Concert Crowd"
              inside_imageUrl={` /images/flipcards/front3.jpg`}
              inside_description="We bring the heat with electrifying riffs, pulsating drums, and raw energy that keeps the crowd rocking all night long."
            />
          </motion.div>
        </div>
      </div>

     
      <div>
        <h1 className="upcoming-albums">Upcoming Albums</h1>
        <motion.div
      className="carousel-container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.3 }} 
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        className="album-swiper"
      >
        {albums.map((album, index) => (
          <SwiperSlide key={index}>
            <AlbumCard
              imageUrl={album.imageUrl}
              title={album.title}
              date={album.date}
              duration={album.duration}
              tracks={album.tracks}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
      </div>


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#09090b',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <img
            src={` /images/contact-home.jpg`}
            alt="Description"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <h1
              style={{
                fontFamily: 'Sansation',
                fontSize: '40px',
                fontWeight: '700',
                color: 'white',
                textShadow: '2px 2px 0 black, -2px -2px 0 black, -2px 2px 0 black, 2px -2px 0 black',
              }}
            >
              Want your event to be loud? Have a crazy night with us
            </h1>
            <Link to="/contact-us" style={{ textDecoration: 'none' }}>
              <Button
                variant="solid"
                p={8}
                fontFamily={'Sansation'}
                fontWeight={'700'}
                fontSize={20}
                background={'#E9204F'}
                color={'white'}
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}