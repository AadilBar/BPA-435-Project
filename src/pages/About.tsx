import Footer from "../components/footer";
import '../CSS/AboutMe.css'; 
import styles from "./About.module.css";
import Member from '../components/member_profile';

export default function About() {
    return (
        <div className={styles.canvas} >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black', marginTop: '20px' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                        src={`${import.meta.env.BASE_URL}/images/background_aboutme.png`}
                        alt="Stage Fright Tour"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>

            <div className="background_lore_background">
               
            <div className="video_container"> 
            <video src={`${import.meta.env.BASE_URL}/images/OutofFocus.mp4`} controls poster={`${import.meta.env.BASE_URL}/images/concertThumbnail.jpeg`} className="video"> Your browser does not support the video tag.</video>
            <h3 className="video_caption">What it's like to Experience a Stage Fright Concert</h3>
            </div> 
                <div className="background_info">


                    <h2 className="background_title">How the Band got Started</h2>

                    <div className="background_description1">Stage Fright was born in 2010 when best friends Ryan Blake (guitarist) and Liam Carter (drummer) teamed up with vocalist Sophia Reed and bassist Emily Hayes after meeting at a local open mic night. Their shared love for classic rock and energetic performances brought them together, and they quickly began writing original songs.</div>

                    <div className="background_description2">The band’s name, Stage Fright, came from the nerves they all felt before their first show—a battle of the bands that they unexpectedly won. That moment cemented their bond and set them on a path to pursue music full-time.</div>

                     <div className="background_description3">Since then, Stage Fright has been lighting up stages across the country with their dynamic sound and electric chemistry. From garage sessions to packed venues, they’ve built a loyal fanbase while staying true to their roots and passion for making music. </div>

                </div>

                


            </div>
            
        <div className="members_page">

            <h2 className="member_title">Meet the Band</h2>


            <div className="members_page_sub"> 
            <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/VocalistImage.jpg`} name= 'Sophia Reed' position='Vocalist' description='Sophia Reed, a captivating vocalist, possesses a powerful and soulful voice that effortlessly blends raw emotion with technical precision.' />
            <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/GuitaristImage.jpg`} name= 'Ryan Blake' position='Guitarist' description='Ryan Blake, a gifted guitarist with a fiery stage presence, delivers electrifying solos and intricate riffs that ignite the energy of every performance.' />
            <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/BassistImage.jpg`} name= 'Emily Hayes' position='Bassist' description='Emily Hayes, a bassist renowned for her powerful and driving grooves, provides the solid foundation that anchors the bands sound.' />
            <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/DrummerImage.jpg`} name= 'Liam Carter' position='Drummer' description='Liam Carter, a dynamic drummer with impeccable timing and explosive energy, provides the driving force behind the bands powerful sound.' />
            </div>
            <Footer></Footer>

        </div>

        </div>
    );
}
