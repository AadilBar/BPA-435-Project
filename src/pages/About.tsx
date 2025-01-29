import Footer from "../components/footer";
import '../CSS/AboutMe.css'; 
import styles from "./About.module.css";
import Member from '../components/member_profile';
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className={`${styles.canvas} responsive-container`} style={{overflow: 'hidden'}}>

            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black', marginTop: '20px', position: 'relative' }}
            >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                        src={`${import.meta.env.BASE_URL}/images/aboutus.jpg`}
                        alt="Stage Fright Tour"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <div className="hero2-overlay">
                        <h1>About Us</h1>
                    </div>
                </div>
            </motion.div>

            <div className="background_lore_background">
                

                <motion.div 
                    className="video_container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                > 
                    <video src={`${import.meta.env.BASE_URL}/images/OutofFocus.mp4`} controls poster={`${import.meta.env.BASE_URL}/images/concertThumbnail.jpeg`} className="video">
                        Your browser does not support the video tag.
                    </video>
                    <h3 className="video_caption">What it's like to Experience a Stage Fright Concert</h3>
                </motion.div>

                <div className="background_info">
                    <motion.h2 
                        className="background_title"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        How the Band got Started
                    </motion.h2>

                    <motion.div 
                        className="background_description1"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        Stage Fright was born in 2010 when best friends Ryan Blake (guitarist) and Liam Carter (drummer) teamed up with vocalist Sophia Reed and bassist Emily Hayes after meeting at a local open mic night. Their shared love for classic rock and energetic performances brought them together, and they quickly began writing original songs.
                    </motion.div>

                    <motion.div 
                        className="background_description2"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        The band’s name, Stage Fright, came from the nerves they all felt before their first show—a battle of the bands that they unexpectedly won. That moment cemented their bond and set them on a path to pursue music full-time.
                    </motion.div>

                    <motion.div 
                        className="background_description3"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Since then, Stage Fright has been lighting up stages across the country with their dynamic sound and electric chemistry. From garage sessions to packed venues, they’ve built a loyal fanbase while staying true to their roots and passion for making music.
                    </motion.div>
                </div>
            </div>
            

            <div className="members_page">
                <h2 className="member_title">Meet the Band</h2>

                <div className="members_page_sub">
                    <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/VocalistImage.jpg`} name= 'Sophia Reed' position='Vocalist' description='Sophia Reed, a captivating vocalist, possesses a powerful and soulful voice that effortlessly blends raw emotion with technical precision.' />
                    <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/GuitaristImage.jpg`} name= 'Ryan Blake' position='Guitarist' description='Ryan Blake, a gifted guitarist with a fiery stage presence, delivers electrifying solos and intricate riffs that ignite the energy of every performance.' />
                    <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/BassistImage.jpg`} name= 'Emily Hayes' position='Bassist' description='Emily Hayes, a bassist renowned for her powerful and driving grooves, provides the solid foundation that anchors the band’s sound.' />
                    <Member imageUrl={`${import.meta.env.BASE_URL}/images/People/DrummerImage.jpg`} name= 'Liam Carter' position='Drummer' description='Liam Carter, a dynamic drummer with impeccable timing and explosive energy, provides the driving force behind the band’s powerful sound.' />
                </div>

                <Footer />
            </div>
        </div>
    );
}