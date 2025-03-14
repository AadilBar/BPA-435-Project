import React from 'react';
import { IconType } from 'react-icons';
import '../CSS/flipcard.css';

interface FlipCardProps {
    frontside_imageUrl: string;
    icon: IconType;
    frontside_title: string;
    inside_title: string;
    inside_imageUrl: string;
    inside_description: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
    frontside_imageUrl,
    icon: Icon,
    frontside_title,
    inside_title,
    inside_imageUrl,
    inside_description
}) => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                {/* Front side */}
                <div className="flip-card-front">
                    <img src={frontside_imageUrl} alt="Frontside" className="card-image" />
                    <div className="front-content">
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            {frontside_title}
                        </h3>
                    </div>
                </div>

                {/* Back side */}
                <div className="flip-card-back">
                    <img src={inside_imageUrl} alt="Inside" className="card-image" />
                    <div className="back-content">
                        <Icon className="icon" />
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            {inside_title}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            textAlign: 'center',
                            padding: '0 20px'
                        }}>
                            {inside_description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;