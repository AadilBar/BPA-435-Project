import Footer from "../components/footer";
import '../CSS/ContactUs.css';
import { LuPhoneCall } from "react-icons/lu";
import { LuMail } from "react-icons/lu";

export default function Contact() {
    return (
        <div>
            
            
            <div className="video_container2">
                <h1>Contact Us</h1>
                <video autoPlay muted loop src={`${import.meta.env.BASE_URL}/images/Concert_Performance.mp4`} className="video-bg"> Your browser does not support the video tag.</video>
                

            </div>

                <div className="faq_container"> 
                        <div className="faq_title_container">
                            <h2 className="faq_title">FAQ</h2>
                        </div>
                   <div className="faq_sub"> 

                            <div className="faq_content">
                                    
                                    <div className="faq_q"> 
                                    Does the band manage its own social media accounts?
                                    </div>

                                    <div className="faq_a">
                                    Yes, we manage our social media accounts directly, so feel free to send us a message or leave a comment.
                                    </div>

                            </div>
                            <div className="faq_content">
                                    
                                    <div className="faq_q"> 
                                    Does the band perform at private events or weddings?
                                    </div>

                                    <div className="faq_a">
                                    Yes! We are available for private events. Contact us for availability and pricing details.
                                    </div>

                            </div>
                            <div className="faq_content">
                                    
                                    <div className="faq_q"> 
                                    What is the band’s touring schedule?
                                    </div>

                                    <div className="faq_a">
                                    You can check our upcoming shows and tour dates on the Tour page.
                                    </div>

                            </div>
                            <div className="faq_content">
                                    
                                    <div className="faq_q"> 
                                    Do you ship merchandise internationally?
                                    </div>

                                    <div className="faq_a">
                                    Yes, we ship to all countries. Please check the Merch page to see our most updated offers.
                                    </div>

                            </div>

                            <div className="faq_content">
                                    
                                    <div className="faq_q"> 
                                    Can I send fan mail or gifts to the band?
                                    </div>

                                    <div className="faq_a">
                                    We love hearing from fans! Coming in late 2025 we will be allowing fan mail!
                                    </div>

                            </div>
                            
                            



                    </div>


                </div>


                <div className="contact_info_container">


                    <div className="contact_info_title"> 
                            Contact Stage Fright
                    </div>

                    <div className="contact_info_phone"> 
                            <h2 className="contact_info_phone_title"><LuPhoneCall className="phone_icon" />Phone:</h2>

                            <h2>Chicago: 123-456-7890</h2>
                            <h2>Naperville: 987-654-3210 </h2>
                            <h2>Springfield: 246-810-1214</h2>
                            <h2>Elgin: 369-121-5182</h2>
                           

                    </div>
                    
                    <div className="contact_info_email"> 
                        <h2 className="contact_info_email_title"><LuMail className="email_icon"/>Email:</h2>

                        <h2>Chicago: stagefri_chic@gmail.com</h2>
                        <h2>Naperville: stagefri_np@gmail.com</h2>
                        <h2>Springfield: stagefri.sf@gmail.com</h2>
                        <h2>Elgin: stagefright.elgin@gmail.com</h2>
                        
                    </div>

                    <div className="contact_info_message"> 

                            <h2 className="message_title">Send a Message </h2>

                            <div className="message_sub">
                             
                                <form className="name_field">
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your name" 
                                
                                        />
                                </form>

                                <form className="number_field">
                                        <input
                                            type="tel"
                                            id="number"
                                            placeholder="Enter your phone number"
                                        />
                                </form>

                                <form className="email_field">
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                </form>

                                <form className="message_field">
                                        <input
                                            type="text"
                                            id="message"
                                            placeholder="Enter your message"
                                        />
                                </form>
                               
                               
                                <button className="send_button">Send</button>
                            </div>

                    </div>


                </div>



            <Footer/>
        </div>
    );
}