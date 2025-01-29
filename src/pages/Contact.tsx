import { useState } from "react";
import Footer from "../components/footer";
import '../CSS/ContactUs.css';
import { LuPhoneCall } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
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
            
                  <div className="hero-contact">
  <div className="hero-contact-overlay">
    <h1>Contact Us</h1>
  </div>  
</div>

            <div className="faq_container">
            <div className="faq_title_container">
                <motion.h2 
                    className="faq_title"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    FAQ
                </motion.h2>
            </div>

            <div className="faq_sub">
                <motion.div
                    className="faq_content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="faq_q"> 
                        Does the band manage its own social media accounts?
                    </div>
                    <div className="faq_a">
                        Yes, we manage our social media accounts directly, so feel free to send us a message or leave a comment.
                    </div>
                </motion.div>

                <motion.div
                    className="faq_content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="faq_q">
                        Does the band perform at private events or weddings?
                    </div>
                    <div className="faq_a">
                        Yes! We are available for private events. Contact us for availability and pricing details.
                    </div>
                </motion.div>

                <motion.div
                    className="faq_content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="faq_q"> 
                        What is the band’s touring schedule?
                    </div>
                    <div className="faq_a">
                        You can check our upcoming shows and tour dates on the Tour page.
                    </div>
                </motion.div>

                <motion.div
                    className="faq_content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="faq_q"> 
                        Do you ship merchandise internationally?
                    </div>
                    <div className="faq_a">
                        Yes, we ship to all countries. Please check the Merch page to see our most updated offers.
                    </div>
                </motion.div>

                <motion.div
                    className="faq_content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="faq_q"> 
                        Can I send fan mail or gifts to the band?
                    </div>
                    <div className="faq_a">
                        We love hearing from fans! Coming in late 2025 we will be allowing fan mail!
                    </div>
                </motion.div>
            </div>
        </div>


        <div className="contact_info_container">
      {/* Contact Title */}
      <motion.div
        className="contact_info_title"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Contact Stage Fright
      </motion.div>

      {/* Phone Section */}
      <motion.div
        className="contact_info_phone"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="phone-text">
          <LuPhoneCall className="phone_icon" />
          Phone:
        </h2>
        <h2>Chicago: 123-456-7890</h2>
        <h2>Naperville: 987-654-3210</h2>
        <h2>Springfield: 246-810-1214</h2>
        <h2>Elgin: 369-121-5182</h2>
      </motion.div>

      {/* Email Section */}
      <motion.div
        className="contact_info_email"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className="email-text">
          <LuMail className="email_icon" />
          Email:
        </h2>
        <h2>Chicago: stagefri_chic@gmail.com</h2>
        <h2>Naperville: stagefri_np@gmail.com</h2>
        <h2>Springfield: stagefri.sf@gmail.com</h2>
        <h2>Elgin: stagefright.elgin@gmail.com</h2>
      </motion.div>

      {/* Message Form Section */}
      <motion.div
        className="contact_info_message"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="message_title">Send a Message</h2>
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
            <textarea
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </form>
          <button className="send_button" onClick={reset}>Send</button>
        </div>
      </motion.div>
    </div>


            <Footer/>

        </div>
    );
}