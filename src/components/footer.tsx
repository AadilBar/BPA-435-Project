import { Link } from "@chakra-ui/react";

export default function Footer() {
    return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '400px', backgroundColor: 'Black', paddingTop: '20px', fontFamily: 'Sansation', fontWeight: 700, fontSize: 20}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', padding: '20px 20px 20px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <img src={`${import.meta.env.BASE_URL}/images/Full Logo.png`} alt="Full Logo" style={{ marginBottom: '20px', width: '150px', height: 'auto' }} />
                <div style={{ marginBottom: '10px', color: 'white' }}>
                    <p>Email: stagefrightbpa435@gmail.com</p>
                    <p>Phone: (331)-280-0810</p>
                </div>
                <div style={{ marginBottom: '10px', color: 'white' }}>
                    <p>Address: 2590 Ogden Ave, Aurora, IL 60504</p>
                </div>
                <a href="/contact" style={{ marginBottom: '20px', color: 'white' }}>Contact Us</a>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Link href="https://spotify.com" mr={4}>
              <img
                src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                alt="Spotify"
                style={{ height: '24px' }}
              />
            </Link>
            <Link href="https://music.apple.com" mr={4}>
              <img
                src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                alt="Apple Music"
                style={{ height: '24px' }}
              />
            </Link>
            <Link href="https://music.youtube.com">
              <img
                src={`${import.meta.env.BASE_URL}/images/Youtube.png`}
                alt="Youtube"
                style={{ height: '24px' }}
              />
            </Link>
                </div>
                <div style={{ color: 'white' }}>
                    <p>&copy; 2023 Stage Fright. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
    );
}
