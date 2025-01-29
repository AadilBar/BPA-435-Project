import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { easing } from 'maath';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { albums } from './albums';
import {IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from "react-icons/fa";
import '../CSS/3d.css'; 


function Rig({ rotationY, ...props }: { rotationY: number; [key: string]: any }) {
    const ref = useRef<THREE.Group>(null!);
    useFrame(() => {
        if (ref.current) {
            easing.damp(ref.current.rotation, 'y', rotationY, 0.1, 0.005);
        }
    });
    return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
    return Array.from({ length: count }, (_, i) => (
        <Card
            key={i}
            url={`${import.meta.env.BASE_URL}/img${(i % 3) + 1}_.png`}
            position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
            rotation={[0, (i / count) * Math.PI * 2, 0]}
        />
    ));
}

function Card({ url, ...props }: { url: string; [key: string]: any }) {
    const ref = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);
    const pointerOver = (e: { stopPropagation: () => any; }) => (e.stopPropagation(), hover(true));
    const pointerOut = () => hover(false);
    
    useFrame((state, delta) => {
        state.clock.getElapsedTime();
        if (ref.current) {
            easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
            easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
            easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
        }
    });
    return (
        <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
            <planeGeometry args={[1, 1, 1, 20]} />
        </Image>
    );
}

const ThreeDAlbums: React.FC = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    
    const currentAlbum = albums[selectedAlbum];

    const handleNextAlbum = () => {
        setSelectedAlbum((prev) => (prev + 1) % albums.length);
        setRotationY((prev) => prev - Math.PI / 4); // Rotate forward
    };

    const handlePreviousAlbum = () => {
        setSelectedAlbum((prev) => (prev - 1 + albums.length) % albums.length);
        setRotationY((prev) => prev + Math.PI / 4); // Rotate backward
    };

    const handlePlaySong = (songUrl: string) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(songUrl);
        setAudio(newAudio);
        newAudio.play();
    };

    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const fadeInStart = windowHeight * 0.5;
            const fadeInEnd = windowHeight * 0.8;

            if (scrollY > fadeInStart && scrollY < fadeInEnd) {
                const progress = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
                setOpacity(progress);
            } else if (scrollY >= fadeInEnd) {
                setOpacity(1);
                window.removeEventListener('scroll', handleScroll); // Remove event listener once opacity is 1
            } else {
                setOpacity(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div style={{
            minHeight: '100vh',
            color: '#ffffff',
            paddingTop: "100px",
            backgroundColor: '#09090b',
            opacity,
            transition: 'opacity 0.5s',
            width: '100%',
            padding: '10px'
        }}>
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
                gap: '4rem'
            }}>
                {/* Left side - Album Info */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div className="album-info">
                        <h1 className="album-title">{currentAlbum.title}</h1>
                        <div className="album-artist-section">
                            <h2 className="album-artist">{currentAlbum.artist}</h2>
                            <div className="social-links">
                                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                                        alt="Spotify"
                                        className="social-icon"
                                    />
                                </a>
                                <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                                        alt="Apple Music"
                                        className="social-icon"
                                    />
                                </a>
                                <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={`${import.meta.env.BASE_URL}/images/Youtube.png`}
                                        alt="YouTube"
                                        className="social-icon"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <div className="tracklist-container">
                        <h3 className="tracklist-title">Tracklist</h3>
                        {currentAlbum.songs.map((song, index) => (
                            <div key={index} className="track-item">
                                <div className="track-info">
                                    <span className="track-number">{(index + 1).toString().padStart(2, '0')}</span>
                                    <span className="track-title">{song.title}</span>
                                </div>
                                <div className="track-actions">
                                    <span className="track-duration">{song.duration}</span>
                                    <IconButton
                                        aria-label={audio && !audio.paused ? "Pause" : "Play"}
                                        className="play-button"
                                        onClick={() => {
                                            if (audio && !audio.paused) {
                                                audio.pause();
                                            } else {
                                                handlePlaySong(`${import.meta.env.BASE_URL}/music/music.mp3`);
                                            }
                                        }}
                                    >
                                        {audio && !audio.paused ? <FaPause /> : <FaPlay />}
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        
                {/* Right side - Album Cover and Carousel */}
                <div className="canvas-container" >
                    <Canvas className="canvas" style={{  backgroundColor: '#09090b', }}>
                        <ambientLight />
                        <Rig scale={[2.04, 2.04, 2.04]} rotationY={rotationY}>
                            <Carousel />
                        </Rig>
                    </Canvas>
                </div>
            </div>
        
            {/* Album Navigation - Previous/Next buttons below the carousel */}
            <div className="album-navigation">
                <button
                    onClick={handlePreviousAlbum}
                    className="nav-button prev-button"
                >
                    <ChevronLeft size={20} />
                    Previous
                </button>
                <button
                    onClick={handleNextAlbum}
                    className="nav-button next-button"
                >
                    Next
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default ThreeDAlbums;