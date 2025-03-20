import React from 'react';
import '../CSS/albumCard.css';
import { MdAccessTime } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";

interface AlbumCardProps {
    imageUrl: string;
    title: string;
    date: string;
    duration: number;
    tracks: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ imageUrl, title, date, duration, tracks }) => {
    return (
        <div className="album-card">
            <div className="album-cover">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="album-details">
                <h2 className="album-name">{title}</h2>
                <div className="album-info">
                    <span><span className="album-icon"><FaCalendar /></span>{date}</span>
                    <span><span className="album-icon"><MdAccessTime /></span>{duration} min</span>
                    <span><span className="album-icon"><IoMusicalNotes /></span>{tracks} tracks</span>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;