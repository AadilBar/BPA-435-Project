export interface Song {
    title: string;
    duration: string;
    link: string;
  }
  
  export interface Album {
    id: number;
    title: string;
    artist: string;
    coverUrl: string;
    songs: Song[];
  }






export const albums: Album[] = [
    {
        id: 1,
        title: "Kinematics",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=800&auto=format&fit=crop",
        songs: [
            { title: "Momentum", duration: "3:42", link: `${import.meta.env.BASE_URL}/music/music.mp3`},
            { title: "Velocity", duration: "4:20", link: `${import.meta.env.BASE_URL}/music/music2.mp3`},
            { title: "Angular Shift", duration: "3:18", link: `${import.meta.env.BASE_URL}/music/music3.mp3`},
            { title: "Dynamic Motion", duration: "4:12", link: `${import.meta.env.BASE_URL}/music/music4.mp3`},
            { title: "Torque", duration: "3:45", link: `${import.meta.env.BASE_URL}/music/music5.mp3`},
            { title: "Centrifugal Dreams", duration: "4:30", link: `${import.meta.env.BASE_URL}/music/music6.mp3`},
            { title: "Gravity's Call", duration: "3:33" ,link: `${import.meta.env.BASE_URL}/music/music7.mp3`},
            { title: "Inertia", duration: "4:05" ,link: `${import.meta.env.BASE_URL}/music/music8.mp3`},
            { title: "Harmonic Swings", duration: "3:55", link: `${import.meta.env.BASE_URL}/music/music9.mp3`},
            { title: "Kinetic Bliss", duration: "3:28" ,link: `${import.meta.env.BASE_URL}/music/music10.mp3`},
        ],
    },
    {
        id: 2,
        title: "Soaring",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop",
        songs: [
            { title: "Lift Off", duration: "4:05", link: `${import.meta.env.BASE_URL}/music/music.mp3` },
            { title: "Cloud Nine", duration: "3:47", link: `${import.meta.env.BASE_URL}/music/music2.mp3` },
            { title: "Skyward Dreams", duration: "4:10", link: `${import.meta.env.BASE_URL}/music/music3.mp3` },
            { title: "Aerial Horizon", duration: "3:57" , link: `${import.meta.env.BASE_URL}/music/music4.mp3`},
            { title: "Thermal Currents", duration: "3:22", link: `${import.meta.env.BASE_URL}/music/music5.mp3` },
            { title: "High Altitude", duration: "4:15", link: `${import.meta.env.BASE_URL}/music/music6.mp3` },
            { title: "Featherlight", duration: "3:48", link: `${import.meta.env.BASE_URL}/music/music7.mp3`},
            { title: "Wings of Gold", duration: "4:02", link: `${import.meta.env.BASE_URL}/music/music8.mp3` },
            { title: "Ascending Thoughts", duration: "4:18", link: `${import.meta.env.BASE_URL}/music/music9.mp3` },
            { title: "Echoes Above", duration: "3:45", link: `${import.meta.env.BASE_URL}/music/music10.mp3` },
        ],
    },
    {
        id: 3,
        title: "Resounding",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613534852-13c6e6034e0c?w=800&auto=format&fit=crop",
        songs: [
            { title: "Echo Chamber", duration: "3:55" , link: `${import.meta.env.BASE_URL}/music/music.mp3` },
            { title: "Sonic Boom", duration: "4:25" , link: `${import.meta.env.BASE_URL}/music/music2.mp3` },
            { title: "Harmonic Waves", duration: "3:41" , link: `${import.meta.env.BASE_URL}/music/music3.mp3` },
            { title: "Rhythmic Pulse", duration: "3:37" , link: `${import.meta.env.BASE_URL}/music/music4.mp3` },
            { title: "Resonant Chords", duration: "4:20" , link: `${import.meta.env.BASE_URL}/music/music5.mp3` },
            { title: "Vibrations", duration: "3:50" , link: `${import.meta.env.BASE_URL}/music/music6.mp3` },
            { title: "Frequency Shift", duration: "4:18", link: `${import.meta.env.BASE_URL}/music/music7.mp3`  },
            { title: "Acoustic Reflections", duration: "4:10" , link: `${import.meta.env.BASE_URL}/music/music8.mp3` },
            { title: "Timbre Trails", duration: "4:01" , link: `${import.meta.env.BASE_URL}/music/music9.mp3` },
            { title: "Soundscape", duration: "3:59" , link: `${import.meta.env.BASE_URL}/music/music10.mp3` },
        ],
    }
];
