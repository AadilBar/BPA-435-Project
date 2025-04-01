import React from 'react';
import '../CSS/awards.css';
import { IconType } from 'react-icons';


interface AwardProps {
 
    icon: IconType; 
    award_name: string; 
    year: number; 
    award_place: string;
}

const Awards: React.FC<AwardProps> = ({
    icon: Icon, 
    award_name, 
    year, 
    award_place
}) => {
    return (
        <div className='awards-component-container'>
            <div className='award2-icon'><Icon /></div>
            <h1 className='award-name'>{award_name}</h1>
            <p className='award-year'>{year}</p>
            <p className='award-place'>{award_place}</p>
        </div>
    );
};

export default Awards;