

import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';
import Album from '../components/album';

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
                <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Popular Albums</h1>
                <h1 style={{ fontFamily: 'Sansation', color: '#E9204F', fontSize: '20px', fontWeight: '700' }}>Click to View Songs</h1>
                <div style={{ height: '50px' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '80%', margin: '0 auto' }}>
                    <Album imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`} releaseText='release text' title='title' description='description'/>
                    <Album imageUrl={`${import.meta.env.BASE_URL}/images/Big Stage Fright Logo.png`} releaseText='release text' title='title' description='description'/>
                    <Album imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`} releaseText='release text' title='title' description='description'/>
                </div>
            </div>


        </div>
        
    );
}
