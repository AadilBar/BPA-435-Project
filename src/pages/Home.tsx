import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';
import EventItem from '../components/event';
import Footer from '../components/footer';
import ThreeDAlbums from '../components/3dAlbums';

export default function Home() {
    return (
        <div>
                <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                    <img src={`${import.meta.env.BASE_URL}/images/Stage_Fright_Main_Page_Image.png`} alt="Full Screen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ThreeDAlbums />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#09090b', paddingTop: '20px' }}>
                <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Upcoming Shows</h1>
                <Link to={'/tour'} onClick={() => window.scrollTo(0, 0)}>
                    <Button variant="solid" p={2} fontFamily={'Sansation'} fontWeight={'700'} fontSize={15}>
                        View All
                    </Button>
                </Link>

                <div style={{ height: '50px' }} ></div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        width: '100%',
                        padding: '0 10%',
                        justifyItems: 'Center',
                        gap: '20px',
                    }}
                >
                    <EventItem
                        imageUrl={`${import.meta.env.BASE_URL}/images/Shows/HuntingtonBankPav.png`}
                        place="Huntington Bank Pavilion"
                        address={'1300 S Linn White Dr, Chicago, IL 60605'}
                        price={500}
                        startDate={new Date('2025-06-01')}
                        endDate={new Date('2025-06-02')}
                        mapData={
                            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7420.551380478309!2d-87.61154152339903!3d41.86455426626153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2b7aa5e5a88b%3A0x2b1be8f520a766ba!2s1300%20S%20Linn%20White%20Dr%2C%20Chicago%2C%20IL%2060605!5e1!3m2!1sen!2sus!4v1735970585409!5m2!1sen!2sus'
                        }
                    />
                    <EventItem
                        imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Pav.png`}
                        place="Credit Union 1 Arena"
                        address={'525 S Racine Ave, Chicago, IL 60607'}
                        price={500}
                        startDate={new Date('2025-06-01')}
                        endDate={new Date('2025-06-02')}
                        mapData={
                            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.591274925742!2d-87.65885062357913!3d41.87467056562848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ce067db1ecd%3A0x73faf6b37b26e279!2s525%20S%20Racine%20Ave%2C%20Chicago%2C%20IL%2060607!5e1!3m2!1sen!2sus!4v1736049280628!5m2!1sen!2sus'
                        }
                    />
                    <EventItem
                        imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Amp.png`}
                        place="Credit Union 1 Amphitheater"
                        address={'19100 Ridgeland Ave, Tinley Park, IL 60477'}
                        price={500}
                        startDate={new Date('2025-06-01')}
                        endDate={new Date('2025-06-02')}
                        mapData={
                            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.5194221513725!2d-87.77817272359236!3d41.544106886258966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e167c293f99b1%3A0x49ae1068b1696c7e!2sCredit%20Union%201%20Amphitheatre!5e1!3m2!1sen!2sus!4v1736049372248!5m2!1sen!2sus'
                        }
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#09090b', paddingTop: '40px' }}>
                <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                    <img src={`${import.meta.env.BASE_URL}/images/contact-home.jpg`} alt="Description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center', padding: '20px' }}>
                        <h1 style={{ fontFamily: 'Sansation', fontSize: '40px', fontWeight: '700', color: 'white', textShadow: '2px 2px 0 black, -2px -2px 0 black, -2px 2px 0 black, 2px -2px 0 black' }}>Want your event to be loud? Have a crazy night with us</h1>
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
                <Footer/>
            </div>

                

    );
}
