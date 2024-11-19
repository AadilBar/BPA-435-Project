import React from 'react';

const Item = () => {
  return (
    <div style={styles.itemContainer}> 
    
    
      <div style={styles.imageContainer}>
        <img
          src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
          alt="item picture"
          style={styles.itemImage}
        />
      </div>


      <div style={styles.detailsContainer}>
        <h3 style={styles.title}>
            MERCH TITLE HERE
        </h3>


        <p style={styles.description}>
        MERCH DESCRIPTION HERE
        </p>
      </div>
    
    
    
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  itemContainer: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    alignItems: 'center', 
    width: 'auto',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '16px',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  imageContainer: {
    width: '300px', 
    padding: '16px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex', // Ensures the image is centered within the container
    justifyContent: 'center',
  },
  itemImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  detailsContainer: {
    marginTop: '16px',
    backgroundColor: '#1a1a1a',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '4px 0',
    backgroundColor: '#1a1a1a',

  },
  description: {
    fontSize: '14px',
    color: '#cccccc',
    marginTop: '8px',
    lineHeight: '1.5',
    backgroundColor: '#1a1a1a',
  },


 
};

export default Item;