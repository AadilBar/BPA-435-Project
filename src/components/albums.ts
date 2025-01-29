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
    {
        id: 4,
        title: "Equilibrium",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop",
        songs: [
            { title: "Balanced Forces", duration: "3:50" },
            { title: "Duality", duration: "4:07" },
            { title: "The Tipping Point", duration: "4:15" },
            { title: "Stillness in Motion", duration: "3:40" },
            { title: "Counterbalance", duration: "4:03" },
            { title: "Static Bliss", duration: "3:58" },
            { title: "Steady Streams", duration: "4:08" },
            { title: "Equal Opposites", duration: "4:20" },
            { title: "Center of Mass", duration: "4:00" },
            { title: "Resting State", duration: "3:45" },
        ],
    },
    {
        id: 5,
        title: "Reverberation",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1629276301837-8840dc1c51ba?w=800&auto=format&fit=crop",
        songs: [
            { title: "Echoes of the Past", duration: "3:57" },
            { title: "Distant Calls", duration: "4:05" },
            { title: "Resonant Peaks", duration: "4:20" },
            { title: "Eternal Ripples", duration: "4:00" },
            { title: "Acoustic Dreams", duration: "3:48" },
            { title: "Fading Waves", duration: "4:15" },
            { title: "Sustained Note", duration: "4:03" },
            { title: "Deep Reverbs", duration: "4:10" },
            { title: "Echo Chamber Blues", duration: "3:55" },
            { title: "Whispered Tones", duration: "4:25" },
        ],
    },
    {
        id: 6,
        title: "Horizon",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613535697-e890fd7de12d?w=800&auto=format&fit=crop",
        songs: [
            { title: "Breaking Dawn", duration: "3:30" },
            { title: "Eternal Sunset", duration: "4:00" },
            { title: "Golden Glow", duration: "3:42" },
            { title: "Chasing Horizons", duration: "4:10" },
            { title: "Fleeting Light", duration: "3:58" },
            { title: "Skylines", duration: "3:50" },
            { title: "Endless Dusk", duration: "4:15" },
            { title: "Twilight Trails", duration: "4:20" },
            { title: "Shifting Views", duration: "4:00" },
            { title: "Onward", duration: "3:45" },
        ],
    },
    {
        id: 7,
        title: "Radiance",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop",
        songs: [
            { title: "Shimmering Lights", duration: "4:00" },
            { title: "Blinding Brilliance", duration: "3:57" },
            { title: "Sunlit Glow", duration: "3:48" },
            { title: "Ethereal Gleam", duration: "4:05" },
            { title: "Reflective Rays", duration: "4:15" },
            { title: "Bright Horizons", duration: "4:02" },
            { title: "Illuminated Paths", duration: "3:50" },
            { title: "Crystal Clear", duration: "3:58" },
            { title: "Aurora Dreams", duration: "4:25" },
            { title: "Celestial Shine", duration: "4:10" },
        ],
    },
    {
        id: 8,
        title: "Ascension",
        artist: "Stage Fright",
        coverUrl: "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=800&auto=format&fit=crop",
        songs: [
            { title: "Rising Tide", duration: "4:18" },
            { title: "Reaching Peaks", duration: "4:02" },
            { title: "Climbing Heights", duration: "3:50" },
            { title: "Above the Clouds", duration: "3:45" },
            { title: "Summit Dreams", duration: "4:00" },
            { title: "Skyline Views", duration: "4:10" },
            { title: "Eternal Climb", duration: "3:55" },
            { title: "Lifting Spirits", duration: "4:20" },
            { title: "Ascending Grace", duration: "3:48" },
            { title: "On Top of the World", duration: "4:15" },
        ],
    },
];
