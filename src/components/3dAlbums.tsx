import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { easing } from 'maath';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { albums } from './albums';
import { IconButton } from '@chakra-ui/react';
import { FaPlay } from "react-icons/fa";



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
            url={`${import.meta.env.BASE_URL}/img${Math.floor(i % 10) + 1}_.jpg`}
            position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
            rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
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
    
    const currentAlbum = albums[selectedAlbum];

    const handleNextAlbum = () => {
        setSelectedAlbum((prev) => (prev + 1) % albums.length);
        setRotationY((prev) => prev - Math.PI / 4); // Rotate forward
    };

    const handlePreviousAlbum = () => {
        setSelectedAlbum((prev) => (prev - 1 + albums.length) % albums.length);
        setRotationY((prev) => prev + Math.PI / 4); // Rotate backward
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
            backgroundColor: '#09090b',
            color: '#ffffff',
            paddingTop: "100px",
            opacity,
            transition: 'opacity 0.5s',
            width: '100%'
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
                <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '0 0 0.5rem 0'
                }}>{currentAlbum.title}</h1>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        color: '#a1a1aa',
                        margin: 0
                    }}>{currentAlbum.artist}</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                                alt="Spotify"
                                style={{ height: '24px' }}
                            />
                        </a>
                        <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                                alt="Apple Music"
                                style={{ height: '24px' }}
                            />
                        </a>
                        <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${import.meta.env.BASE_URL}/images/Youtube.png`}
                                alt="Youtube"
                                style={{ height: '24px' }}
                            />
                        </a>
                    </div>
                </div>
                </div>

                <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem'
                }}>
                <button
                    onClick={handlePreviousAlbum}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '1.125rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#27272a'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#18181b'}
                >
                    <ChevronLeft size={20} />
                    Previous
                </button>
                <button
                    onClick={handleNextAlbum}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '1.125rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#27272a'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#18181b'}
                >
                    Next
                    <ChevronRight size={20} />
                </button>
                </div>

                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '1rem'
                }}>Tracklist</h3>
                {currentAlbum.songs.map((song, index) => (
                    <div
                    key={index}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1rem 1.5rem',
                        backgroundColor: '#18181b',
                        borderRadius: '0.75rem',
                        marginBottom: '0.75rem',
                        transition: 'background-color 0.2s',
                        fontSize: '1.125rem',
                        height: '3.5rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#27272a'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#18181b'}
                    >
                    <div style={{
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <span style={{ color: '#71717a' }}>
                        {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span>{song.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#71717a' }}>{song.duration}</span>
                        <IconButton
                            aria-label="Play"
                            backgroundColor="#18181b"
                            color="#ffffff"
                            borderRadius="50%"
                            _hover={{ backgroundColor: '#27272a' }}
                            _active={{ backgroundColor: '#27272a' }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <FaPlay />
                        </IconButton>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Right side - Album Cover */}
            <div style={{
                aspectRatio: '1',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0.5rem',
                width: '100%'
            }}>
                <Canvas style={{ width: '100%' }}>
                <ambientLight />
                <Rig scale={[2.04, 2.04, 2.04]} rotationY={rotationY}>
                    <Carousel />
                </Rig>
                </Canvas>
            </div>
            </div>
        </div>

    );
};

export default ThreeDAlbums;