import EventItem from '../components/event';
import Footer from '../components/footer';

export default function Tour() {
    return (
      <>

        <div style={styles.tourIntroContainer}>
          <div style={styles.overlay}></div>
          <div style={styles.overlayTextContainer}>
            <h1 style={styles.tourTitle}>Stage Fright on Tour</h1>
            <p style={styles.slogan}>Get ready to rock with Stage Fright. The adventure begins now!</p>
          </div>
        </div>
  

        <div style={styles.tourDatesContainer}>
          <h1 style={styles.tourDatesTitle}>Tour Dates</h1>
  
          <div style={styles.itemsContainer}>
          <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/HuntingtonBankPav.png`} place='Huntington Bank Pavilion' address={"1300 S Linn White Dr, Chicago, IL 60605"} price={50} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')} mapData={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7420.551380478309!2d-87.61154152339903!3d41.86455426626153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2b7aa5e5a88b%3A0x2b1be8f520a766ba!2s1300%20S%20Linn%20White%20Dr%2C%20Chicago%2C%20IL%2060605!5e1!3m2!1sen!2sus!4v1735970585409!5m2!1sen!2sus"}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Pav.png`} place='Credit Union 1 Arena' address={"525 S Racine Ave, Chicago, IL 60607"} price={50} startDate={new Date('2025-06-07')} endDate={new Date('2025-06-8')} mapData={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.591274925742!2d-87.65885062357913!3d41.87467056562848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ce067db1ecd%3A0x73faf6b37b26e279!2s525%20S%20Racine%20Ave%2C%20Chicago%2C%20IL%2060607!5e1!3m2!1sen!2sus!4v1736049280628!5m2!1sen!2sus"}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Amp.png`} place='Credit Union 1 Amphitheater' address={"19100 Ridgeland Ave, Tinley Park, IL 60477"} price={50} startDate={new Date('2025-06-14')} endDate={new Date('2025-06-015')} mapData={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.5194221513725!2d-87.77817272359236!3d41.544106886258966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e167c293f99b1%3A0x49ae1068b1696c7e!2sCredit%20Union%201%20Amphitheatre!5e1!3m2!1sen!2sus!4v1736049372248!5m2!1sen!2sus"}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Riviera.png`} place='Riviera Theatre' address={"4746 N Racine Ave, Chicago, IL 60640"} price={50} startDate={new Date('2025-06-21')} endDate={new Date('2025-06-22')} mapData={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.472809154035!2d-87.66264292357535!3d41.96865595973894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd22cf3dffc5b%3A0xd556d6c6fd599c1!2s4746%20N%20Racine%20Ave%2C%20Chicago%2C%20IL%2060640!5e1!3m2!1sen!2sus!4v1736049447545!5m2!1sen!2sus"}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/SaltShed.png`} place='Salt Shed' address={"1357 N Elston Ave, Chicago, IL 60642"} price={50} startDate={new Date('2025-06-28')} endDate={new Date('2025-06-29')} mapData={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6951.6919951081545!2d-87.66405951057561!3d41.9067366894724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2d83f2fb95b%3A0xce3f70174a3e2799!2s1357%20N%20Elston%20Ave%2C%20Chicago%2C%20IL%2060642!5e1!3m2!1sen!2sus!4v1736049503570!5m2!1sen!2sus"}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/UnitedCenter.png`} place='United Center' address={"1901 W Madison St, Chicago, IL 60612"} price={50} startDate={new Date('2025-07-5')} endDate={new Date('2025-07-06')} mapData={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.259710528626!2d-87.67675642357887!3d41.8807639652469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2d3eb7f6e34d%3A0x1f0cd7161ad43000!2sUnited%20Center%2C%201901%20W%20Madison%20St%2C%20Chicago%2C%20IL%2060612!5e1!3m2!1sen!2sus!4v1736049562523!5m2!1sen!2sus"}/>
          </div>
        </div>
  
        <br />
        <Footer />
      </>
    );
  }
  
  // Styles for the Tour Page
  const styles: { [key: string]: React.CSSProperties } = {
    tourIntroContainer: {
      marginTop: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${import.meta.env.BASE_URL}/images/tour-page-cover.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '50vh',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeIn 3s ease-in-out',  
      
    },
    overlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      zIndex: 1, 
    },
    overlayTextContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      zIndex: 2,  
      width: '90%',  
    },
    tourTitle: {
      fontSize: '80px',
      fontWeight: 700,
      fontFamily: 'Sansation, sans-serif',  
      textTransform: 'uppercase',
      letterSpacing: '15px',  
      animation: 'textZoom 2s ease-out',
      textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)', 
    },
    slogan: {
      fontSize: '24px',
      fontWeight: 700,
      fontFamily: 'Sansation, sans-serif',
      marginTop: '10px',
      fontStyle: 'italic',
      animation: 'fadeIn 3s ease-in-out',
      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)', 
    },
    tourDatesContainer: {
      backgroundColor: '#000',
      paddingTop: '70px',
      paddingBottom: '70px',
      textAlign: 'center',
      padding: '30px 0',
      color: 'white',
    },
    tourDatesTitle: {
      fontSize: '50px',
      fontWeight: 700,
      fontFamily: 'Sansation, sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '5px',
      animation: 'fadeIn 3s ease-in-out',
    },
    itemsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      marginTop: '30px',
    },
  };
  

  const globalStyles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    @keyframes textZoom {
      from {
        transform: scale(0.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Media Queries for Mobile Responsiveness */
    @media (max-width: 768px) {
      .tourIntroContainer {
        height: 60vh; /* Reduce the height of the intro container on mobile */
      }
      .tourTitle {
        font-size: 40px; /* Smaller font size for the title */
        letter-spacing: 10px; /* Adjust letter spacing */
      }
      .slogan {
        font-size: 18px; /* Smaller font size for the slogan */
      }
      .tourDatesTitle {
        font-size: 30px; /* Smaller font size for the tour dates title */
      }
      .itemsContainer {
        flex-direction: column; /* Stack the event items vertically on smaller screens */
        gap: 10px; /* Reduce gap between event items */
      }
    }

    /* Additional responsiveness for very small screens (mobile phones) */
    @media (max-width: 480px) {
      .tourTitle {
        font-size: 32px; /* Further reduce the font size */
        letter-spacing: 5px; /* Adjust spacing for small screens */
      }
      .slogan {
        font-size: 16px; /* Smaller font size for slogans */
      }
      .tourDatesTitle {
        font-size: 24px; /* Even smaller font for mobile */
      }
    }
  `;
  
  export { globalStyles };