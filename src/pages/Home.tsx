

import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';
import Album from '../components/album';
import EventItem from '../components/event';
import Footer from '../components/footer';

export default function Home() {
    return (
        <div style={{backgroundColor: "black"}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#E9204F', fontSize: '10vw' }}>STAGE FRIGHT TOUR</h1>
                    <Button colorScheme="#E9204F" size="lg" variant="outline" style={{ marginTop: '20px' }}>
                        <Link to="/tour" style={{ textDecoration: 'none', color: '#E9204F' }}>Buy Tickets</Link>
                    </Button>
                </div>   
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '861px', backgroundColor: '#01010a', paddingTop: '20px' }}>
                <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Upcoming Shows</h1>
                <Button variant="solid" p={2} fontFamily={"Sansation"} fontWeight={'700'} fontSize={15}>View All</Button>

                <div style={{ height: '50px' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '100%', padding: '0 10%', height: '70%', justifyItems: "Center"}}>
                <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/HuntingtonBankPav.png`} place='Huntington Bank Pavilion' address={" 1300 S Linn White Dr, Chicago, IL 60605"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Pav.png`} place='Credit Union 1 Arena' address={"525 S Racine Ave, Chicago, IL 60607"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Amp.png`} place='Credit Union 1 Amphitheater' address={"19100 Ridgeland Ave, Tinley Park, IL 60477"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                </div>    
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '861px', backgroundColor: '#01010a', paddingTop: '20px' }}>
                <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Popular Albums</h1>
                <h1 style={{ fontFamily: 'Sansation', color: '#E9204F', fontSize: '20px', fontWeight: '700' }}>Click to View Songs</h1>
                <div style={{ height: '50px' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '100%', padding: '0 10%', height: '70%', justifyItems: "Center"}}>
                <Album imageUrl={`${import.meta.env.BASE_URL}/images/albums/album.png`} name='Lights Out, Fear On' releaseDate={new Date("2024-06-08")}/>
                    <Album imageUrl={`${import.meta.env.BASE_URL}/images/albums/album.png`} name='Curtain Call' releaseDate={new Date("2024-02-15")}/>
                    <Album imageUrl={`${import.meta.env.BASE_URL}/images/albums/album.png`} name='Curtain Call' releaseDate={new Date("2024-02-15")}/>
                </div>    
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '600px', backgroundColor: 'Black', paddingTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', padding: '20px 20px 20px 0' }}>
                    <img src={`${import.meta.env.BASE_URL}/images/guitar.png`} alt="Description" style={{ width: '46%', height: 'auto' }} />
                    <div style={{ width: '40%', color: 'white', textAlign: 'left', paddingLeft: '20px' }}>
                        <h1 style={{ fontFamily: 'Sansation', fontSize: '70px', fontWeight: '700' }}>Want your event to be loud? Have a crazy night with us</h1>
                        <Button variant="solid" p={8} fontFamily={"Sansation"} fontWeight={"700"} fontSize={30} background={"#E9204F"} color={"white"}>Contact Us</Button>
                    </div>
                </div>    
            </div>

            <Footer />


        </div>
        
    );
}
