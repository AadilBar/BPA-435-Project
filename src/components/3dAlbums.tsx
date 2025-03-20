import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { easing } from 'maath';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { albums } from './albums';
import { IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { motion } from "framer-motion"; 
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

function Carousel({ radius = 1.5, count = 9 }: { radius?: number; count?: number }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={` /img${(i % 3) + 1}_.png`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[0, (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Card({ url, ...props }: { url: string; [key: string]: any }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: { stopPropagation: () => void }) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);

  useFrame((_, delta) => {
    if (ref.current) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
      easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.03, 0.2, delta);
      easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.1, 0.2, delta);
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
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const currentAlbum = albums[selectedAlbum];

  const handleNextAlbum = () => {
    setSelectedAlbum((prev) => (prev + 1) % albums.length);
    setRotationY((prev) => prev - Math.PI / 4.5);
  };

  const handlePreviousAlbum = () => {
    setSelectedAlbum((prev) => (prev - 1 + albums.length) % albums.length);
    setRotationY((prev) => prev + Math.PI / 4.5);
  };

  const handlePlaySong = (songUrl: string, index: number) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(songUrl);
    setAudio(newAudio);
    newAudio.play();
    setPlayingIndex(index);
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
        window.removeEventListener('scroll', handleScroll);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        color: '#ffffff',
        backgroundColor: '#09090b',
        width: '100%',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div className="album-content" style={{ display: 'flex', gap: '4rem' }}>
          {/* Left Section: 3D Model */}
          <motion.div
            className="left-section"
            style={{ flex: 1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: opacity, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="canvas-container" style={{ height: '100%' }}>
              <Canvas className="canvas" style={{ backgroundColor: '#09090b' }}>
                <ambientLight />
                <Rig scale={[1.95, 1.95, 2]} rotationY={rotationY}>
                  <Carousel />
                </Rig>
              </Canvas>
            </div>
          </motion.div>

          {/* Right Section: Title, Navigation, and Tracklist */}
          <motion.div
            className="right-section"
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: opacity, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Container for title and navigation */}
            <div className="title-and-navigation">
              <h1 className="album-title">{currentAlbum.title}</h1>
              <div className="album-navigation">
                <button onClick={handlePreviousAlbum} className="nav-button prev-button">
                  <ChevronLeft size={20} />
                  Previous
                </button>
                <button onClick={handleNextAlbum} className="nav-button next-button">
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Tracklist */}
            <div className="tracklist-container">
              {currentAlbum.songs.map((song, index) => (
                <motion.div
                  key={index}
                  className="track-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="track-info">
                    <span className="track-number">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="track-title">{song.title}</span>
                  </div>
                  <div className="track-actions">
                    <span className="track-duration">{song.duration}</span>
                    <IconButton
                      aria-label={playingIndex === index && audio && !audio.paused ? 'Pause' : 'Play'}
                      onClick={() => {
                        if (playingIndex === index && audio && !audio.paused) {
                          audio.pause();
                          setPlayingIndex(null);
                        } else {
                          handlePlaySong(song.link, index);
                        }
                      }}
                      bg="red.500"
                      color="white"
                      borderRadius="50%"
                      p={2}
                      _hover={{ bg: 'red.600', transform: 'scale(1.1)' }}
                    >
                      {playingIndex === index && audio && !audio.paused ? <FaPause /> : <FaPlay />}
                    </IconButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDAlbums;
