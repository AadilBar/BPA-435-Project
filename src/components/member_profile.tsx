import React, { useEffect, useRef } from 'react';
import '../CSS/AboutMe.css';

interface StoreCardProps {
    imageUrl: string;
    name: string;
    position: string;
    description: string;
}

const Member: React.FC<StoreCardProps> = ({ imageUrl, name, position, description }) => {
    const memberRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (memberRef.current) {
            observer.observe(memberRef.current);
        }

        return () => {
            if (memberRef.current) {
                observer.unobserve(memberRef.current);
            }
        };
    }, []);

    return (
        <div ref={memberRef} className='member_container fade-section'>
            <img src={imageUrl} alt="item picture" className="member_image" />
            
            <div className='member_name'>
                <h2 style={{ fontWeight: 'bold' }}>{name}</h2>
            </div>

            <div className='member_position'>
                <h2>{position}</h2>
            </div>

            <div className='member_description'>
                <h5>{description}</h5>
            </div>
        </div>
    );
};

export default Member;