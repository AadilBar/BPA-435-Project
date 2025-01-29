export interface Song {
    title: string;
    duration: string;
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
            { title: "Momentum", duration: "3:42" },
            { title: "Velocity", duration: "4:20" },
            { title: "Angular Shift", duration: "3:18" },
            { title: "Dynamic Motion", duration: "4:12" },
            { title: "Torque", duration: "3:45" },
            { title: "Centrifugal Dreams", duration: "4:30" },
            { title: "Gravity's Call", duration: "3:33" },
            { title: "Inertia", duration: "4:05" },
            { title: "Harmonic Swings", duration: "3:55" },
            { title: "Kinetic Bliss", duration: "3:28" },
        ],
    },
    {
        id: 2,
        title: "Soaring",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop",
        songs: [
            { title: "Lift Off", duration: "4:05" },
            { title: "Cloud Nine", duration: "3:47" },
            { title: "Skyward Dreams", duration: "4:10" },
            { title: "Aerial Horizon", duration: "3:57" },
            { title: "Thermal Currents", duration: "3:22" },
            { title: "High Altitude", duration: "4:15" },
            { title: "Featherlight", duration: "3:48" },
            { title: "Wings of Gold", duration: "4:02" },
            { title: "Ascending Thoughts", duration: "4:18" },
            { title: "Echoes Above", duration: "3:45" },
        ],
    },
    {
        id: 3,
        title: "Resounding",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613534852-13c6e6034e0c?w=800&auto=format&fit=crop",
        songs: [
            { title: "Echo Chamber", duration: "3:55" },
            { title: "Sonic Boom", duration: "4:25" },
            { title: "Harmonic Waves", duration: "3:41" },
            { title: "Rhythmic Pulse", duration: "3:37" },
            { title: "Resonant Chords", duration: "4:20" },
            { title: "Vibrations", duration: "3:50" },
            { title: "Frequency Shift", duration: "4:18" },
            { title: "Acoustic Reflections", duration: "4:10" },
            { title: "Timbre Trails", duration: "4:01" },
            { title: "Soundscape", duration: "3:59" },
        ],
    },
];
