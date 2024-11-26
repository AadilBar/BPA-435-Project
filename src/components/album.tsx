import React from 'react';

interface AlbumCardProps {
  imageUrl: string;
  releaseText: string;
  title: string;
  description: string;
}

const Album: React.FC<AlbumCardProps> = ({ imageUrl, releaseText, title, description }) => {
  return (
    <div style={styles.cardContainer}> 
      <div style={styles.imageContainer}>
        <img
          src={imageUrl} 
          alt="Album Cover"
          style={styles.albumImage}
        />
      </div>
      <div style={styles.detailsContainer}>
        <p style={styles.releaseText}>{releaseText}</p>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>
          {description}
        </p>
        <div style={styles.playButton}>
          <span style={styles.playIcon}>&#9654;</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  cardContainer: {
    width: '475px',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '16px',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  albumImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#ffffff',
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '14px',
  },
  albumText: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '8px',
    letterSpacing: '2px',
  },
  albumTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0',
  },
  remixText: {
    fontSize: '12px',
    color: '#d3d3d3',
    margin: '4px 0',
  },
  originalMix: {
    fontSize: '10px',
    fontWeight: 'bold',
    marginTop: '6px',
    letterSpacing: '1.5px',
  },
  detailsContainer: {
    marginTop: '16px',
    backgroundColor: '#1a1a1a',
    fontFamily: 'Arial, sans-serif',
  },
  releaseText: {
    fontSize: '12px',
    color: '#888888',
    marginBottom: '4px',
    backgroundColor: '#1a1a1a',

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
  playButton: {
    backgroundColor: '#333333',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: '12px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  playIcon: {
    color: '#ffffff',
    fontSize: '18px',
    backgroundColor: '#333333',
  },
};

export default Album;
