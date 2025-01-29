import EventItem from '../components/event';
import Footer from '../components/footer';

export default function Tour() {
    return (
      <>
        {/* Tour Animation Section */}
        <div style={styles.tourIntroContainer}>
          <div style={styles.overlay}></div> {/* Dim the background */}
          <div style={styles.overlayTextContainer}>
            <h1 style={styles.tourTitle}>Stage Fright on Tour</h1>
            <p style={styles.slogan}>Get ready to rock with Stage Fright. The adventure begins now!</p>
          </div>
        </div>
  
        {/* Tour Dates Section */}
        <div style={styles.tourDatesContainer}>
          <h1 style={styles.tourDatesTitle}>Tour Dates</h1>
  
          <div style={styles.itemsContainer}>
            <EventItem
              imageUrl={`${import.meta.env.BASE_URL}/images/Shows/HuntingtonBankPav.png`}
              place='Huntington Bank Pavilion'
              address={"1300 S Linn White Dr, Chicago, IL 60605"}
              price={500}
              startDate={new Date('2025-06-01')}
              endDate={new Date('2025-06-02')}
              mapData={"https://www.google.com/maps/embed?pb=!1m18..."}
            />
            <EventItem
              imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Pav.png`}
              place='Credit Union 1 Arena'
              address={"525 S Racine Ave, Chicago, IL 60607"}
              price={500}
              startDate={new Date('2025-06-07')}
              endDate={new Date('2025-06-8')}
              mapData={"https://www.google.com/maps/embed?pb=!1m18..."}
            />
            <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Amp.png`} place='Credit Union 1 Amphitheater' address={"19100 Ridgeland Ave, Tinley Park, IL 60477"} price={500} startDate={new Date('2025-06-14')} endDate={new Date('2025-06-15')} mapData={"https://www.google.com/maps/embed?pb=!1m18..."} />
            <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Riviera.png`} place='Riviera Theatre' address={"4746 N Racine Ave, Chicago, IL 60640"} price={500} startDate={new Date('2025-06-21')} endDate={new Date('2025-06-22')} mapData={"https://www.google.com/maps/embed?pb=!1m18..."} />
            <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/SaltShed.png`} place='Salt Shed' address={"1357 N Elston Ave, Chicago, IL 60642"} price={500} startDate={new Date('2025-06-28')} endDate={new Date('2025-06-29')} mapData={"https://www.google.com/maps/embed?pb=!1m18..."} />
            <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/UnitedCenter.png`} place='United Center' address={"1901 W Madison St, Chicago, IL 60612"} price={500} startDate={new Date('2025-07-5')} endDate={new Date('2025-07-06')} mapData={"https://www.google.com/maps/embed?pb=!1m18..."} />
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${import.meta.env.BASE_URL}/images/tour-page-cover.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeIn 3s ease-in-out',  // Fade-in animation for the background
    },
    overlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for dimming effect
      zIndex: 1,  // Ensure the overlay is above the image but below the text
    },
    overlayTextContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      zIndex: 2,  // Text should be above the overlay
      width: '90%',  // Make the text container take up more width
    },
    tourTitle: {
      fontSize: '80px',
      fontWeight: 'bold',
      fontFamily: 'Rock Salt, sans-serif',  // Unique, cool font
      textTransform: 'uppercase',
      letterSpacing: '15px',  // Increased letter spacing
      animation: 'textZoom 2s ease-out',
      textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)', // Adding shadow to text for better visibility
    },
    slogan: {
      fontSize: '24px',
      fontWeight: '400',
      fontFamily: 'Arial, sans-serif',
      marginTop: '10px',
      fontStyle: 'italic',
      animation: 'fadeIn 3s ease-in-out',
      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)', // Shadow for better legibility
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
      fontWeight: '700',
      fontFamily: 'Helvetica, sans-serif',
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
  
  // Animation Styles
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