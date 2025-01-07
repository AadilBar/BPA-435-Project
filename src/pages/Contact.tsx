import { useState } from "react";
import Footer from "../components/footer";
import '../CSS/ContactUs.css';
import { LuPhoneCall } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";

export default function Contact() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const reset = () =>{
        setName('');
        setNumber('');
        setEmail('');
        setMessage('');
        toast.success(`Your message has been sent to our team, We will get back to you as soon as possible!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                  color: '#E9204F', 
                  backgroundColor: '#2C2C2C', 
                }
              });
    }

    return (
        <div>
                  <ToastContainer />
            
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </form>

                        <form className="number_field">
                            <input
                                type="tel"
                                id="number"
                                placeholder="Enter your phone number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </form>

                        <form className="email_field">
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>

                        <form className="message_field">
                            <input
                                type="text"
                                id="message"
                                placeholder="Enter your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </form>
                                <button className="send_button" onClick={reset}>Send</button>
                            </div>

                    </div>


                </div>



            <Footer/>

        </div>
    );
}