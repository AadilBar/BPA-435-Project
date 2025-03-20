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
            { title: "Momentum", duration: "3:42", link: ` /music/music7.mp3`},
            { title: "Velocity", duration: "4:20", link: ` /music/music9.mp3`},
            { title: "Angular Shift", duration: "3:18", link: ` /music/music3.mp3`},
            { title: "Kinetic Flow", duration: "4:12", link: ` /music/music4.mp3`},
            { title: "Torque", duration: "3:45", link: ` /music/music5.mp3`},
            { title: "Tidal Pull", duration: "3:33" ,link: ` /music/music2.mp3`},
     
        ],
    },
    {
        id: 2,
        title: "Soaring",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop",
        songs: [
            { title: "Lift Off", duration: "4:05", link: ` /music/music7.mp3` },
            { title: "Cloud Nine", duration: "3:47", link: ` /music/music9.mp3` },
            { title: "Skyward", duration: "4:10", link: ` /music/music3.mp3` },
            { title: "Aerial View", duration: "3:57" , link: ` /music/music4.mp3`},
            { title: "Updraft", duration: "3:22", link: ` /music/music5.mp3` },
            { title: "Glide", duration: "3:48", link: ` /music/music2.mp3`},

        ],
    },
    {
        id: 3,
        title: "Resounding",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613534852-13c6e6034e0c?w=800&auto=format&fit=crop",
        songs: [
            { title: "Echo Chamber", duration: "3:55" , link: ` /music/music7.mp3` },
            { title: "Sonic Boom", duration: "4:25" , link: ` /music/music9.mp3` },
            { title: "Waveform", duration: "3:41" , link: ` /music/music3.mp3` },
            { title: "Rhythmic Pulse", duration: "3:37" , link: ` /music/music4.mp3` },
            { title: "Resonance", duration: "4:20" , link: ` /music/music5.mp3` },
            { title: "Vibrations", duration: "3:50" , link: ` /music/music2.mp3` },

        ],
    }
];
