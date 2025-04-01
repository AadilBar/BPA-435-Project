import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import '../CSS/ContactUs.css';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { LuPhoneCall, LuMail } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Footer from '../components/footer';
import 'swiper/css/autoplay'

export default function Contact() {
    const [selectedTopic, setSelectedTopic] = useState<keyof typeof descriptions>("Purchases & Merchandise");
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const mg_pics = [
      {
        imageUrl: '/images/Contact/C1.jpg',
      },
      {
        imageUrl: '/images/Contact/C2.jpg',
      },
      {
        imageUrl: '/images/Contact/C3.jpg',
      },
      {
        imageUrl: '/images/Contact/C4.jpg',
      },
      {
        imageUrl: '/images/Contact/C5.jpg',
      },
      {
        imageUrl: '/images/Contact/C6.jpg',
      },
      {
        imageUrl: '/images/Contact/C7.jpg',
      }
    ];
    const descriptions = {
        "Purchases & Merchandise": [
            { title: "Order Tracking", content: "You can track your order status by logging into your account and visiting the 'Order History' section. A tracking link will be provided once your order has shipped." },
            { title: "Refunds & Returns Policy", content: "If you are unsatisfied with your purchase, you may return it within 90 days for a refund or exchange. Items must be unused and in their original packaging. Digital products and personalized items are non-refundable." },
            { title: "Shipping Information", content: "We offer domestic and international shipping options. Costs and delivery times vary based on your location and chosen shipping method. Expedited shipping is available for an additional fee." },
            { title: "Sizing Guides for Apparel", content: "Check our detailed sizing charts for t-shirts, hoodies, and other apparel items to ensure you select the right fit. If you're between sizes, we recommend sizing up for a more comfortable fit." },
            { title: "Digital vs. Physical Product Information", content: "Digital products, such as MP3 downloads and exclusive content, are delivered via email or an online account. Physical products, such as CDs and vinyl, are shipped to your provided address." },
            { title: "Customer Support for Orders", content: "If you need help with an order, cancellation, or modification, please contact our customer support team through our website. Make sure to have your order number ready for faster assistance." }
        ],
        "Concert & Ticketing Support": [
            { title: "Buying Tickets", content: "Tickets can be purchased through official vendors such as Ticketmaster, Live Nation, or directly from our website. Always buy from authorized sources to avoid scams or counterfeit tickets." },
            { title: "Refunds & Cancellations for Concerts", content: "Refunds for concert tickets depend on the venue's policy. If an event is canceled, you will receive a full refund. If rescheduled, your ticket remains valid for the new date." },
            { title: "VIP & Meet-and-Greet Packages", content: "VIP packages offer perks like premium seating, early entry, and exclusive merchandise. Meet-and-greet packages provide an opportunity to meet the band before or after the show." },
            { title: "Accessibility Information for Shows", content: "Venues provide accessibility accommodations, including wheelchair seating and assistive listening devices. Check with the venue in advance for specific services available at each event." },
            { title: "Lost or Stolen Ticket Assistance", content: "If your ticket is lost or stolen, contact the original ticket vendor for assistance. Digital tickets can usually be reissued, while physical tickets may require proof of purchase." },
            { title: "Event Rescheduling or Postponements", content: "If an event is rescheduled, your ticket will be valid for the new date. If you are unable to attend, check with the ticket vendor for possible refund or exchange options." }
        ],
        "Music & Streaming": [
            { title: "Where to Stream/Buy Music", content: "You can stream our music on Spotify, Apple Music, YouTube Music, and other platforms. Physical copies, including vinyl and CDs, are available for purchase on our official store." },
            { title: "Download Issues", content: "If you experience issues downloading music, ensure your internet connection is stable. Check your spam folder for download links, and contact support if problems persist." },
            { title: "Lyrics & Song Meaning Requests", content: "Official lyrics can be found on streaming platforms, album booklets, and lyric websites like Genius. Song meanings may be discussed in interviews or shared by the band on social media." },
            { title: "Exclusive/Bonus Content Access", content: "Exclusive content, such as unreleased songs and behind-the-scenes footage, is available through special album editions, memberships, and fan club perks." },
            { title: "Music Licensing Requests", content: "For commercial use of our music, including film, advertisements, or social media, please submit a licensing request through our management team." },
            { title: "Streaming Troubleshooting", content: "If you encounter playback issues, try clearing your app cache, restarting your device, or reinstalling the streaming app. Ensure your subscription is active if using a paid service." }
        ],
        "Fan Club & Membership": [
            { title: "Joining the Official Fan Club", content: "Sign up for our fan club to receive exclusive content, early ticket access, and special merchandise offers. Membership tiers offer different perks based on your level of support." },
            { title: "Membership Perks", content: "Perks include presale ticket codes, exclusive merchandise discounts, early access to new music, and behind-the-scenes content." },
            { title: "Subscription Billing & Cancellation", content: "Memberships renew automatically based on your subscription plan. You can manage or cancel your membership anytime through your account settings." },
            { title: "Fan Club Events", content: "Members get access to exclusive fan meetups, virtual Q&A sessions, and private performances. Event details are shared through the fan club portal." },
            { title: "Membership Renewal", content: "If your membership expires, you can renew it manually through your account. Some perks may require continuous membership to maintain access." },
            { title: "Fan Club Support", content: "For issues related to your membership, contact our support team through the fan club website or email." }
        ],
        "Technical Support": [
            { title: "Issues with Online Store", content: "If you're experiencing issues with our online store, try clearing your browser cache or using a different browser. Contact support if the problem continues." },
            { title: "Problems Accessing Exclusive Content", content: "Ensure you are logged into the correct account. If you purchased exclusive content but cannot access it, check your purchase confirmation for details or reach out to support." },
            { title: "App or Website Login Issues", content: "If you're unable to log in, reset your password using the 'Forgot Password' link. Ensure you are using the correct email associated with your account." },
            { title: "Account Management", content: "Update your email, password, and notification preferences by logging into your account settings." },
            { title: "Error Messages or Bugs", content: "If you encounter an error, try refreshing the page, updating your app, or restarting your device. Report persistent issues to our technical support team with a screenshot of the error message." },
            { title: "Technical Support Contact", content: "For urgent technical issues, contact our support team through our website's help center or via email." }
        ],
    };

    const toggleCard = (title: string) => {
        setExpandedCard(expandedCard === title ? null : title);
    };

    const reset = () =>{
        setName('');
        setNumber('');
        setEmail('');
        setMessage('');
        toast.success(`Your message has been sent to our team. We will get back to you as soon as possible!`, {
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

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newsletterInputs = document.querySelectorAll(".newsletter-input");
        const allFieldsFilled = Array.from(newsletterInputs).every(input => (input as HTMLInputElement).value.trim() !== "");

        if (!allFieldsFilled) {
            toast.error("Please fill out all fields before signing up.", {
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
                },
            });
            return;
        }

        toast.success("Thank you for signing up for our newsletter!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                color: '#4CAF50',
                backgroundColor: '#2C2C2C',
            },
        });

        newsletterInputs.forEach(input => (input as HTMLInputElement).value = "");
    };

    const handleMeetAndGreetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mgInputs = document.querySelectorAll(".mg-input, .mg-textarea");
        const allFieldsFilled = Array.from(mgInputs).every(input => (input as HTMLInputElement).value.trim() !== "");

        if (!allFieldsFilled) {
            toast.error("Please fill out all fields before booking.", {
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
                },
            });
            return;
        }

        toast.success("Your Meet & Greet has been successfully booked!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                color: '#4CAF50',
                backgroundColor: '#2C2C2C',
            },
        });

        mgInputs.forEach(input => (input as HTMLInputElement).value = "");
    };

    return (
        <div className="contact-page-container"> {/*Intro Part of the Contact Page*/}
        <ToastContainer />
            <div className="contact-hero">
                <div className="contact-title-overlay">
                    <h1>Contact Us</h1>
                </div>
            </div>
            {/*Very Cool FAQ GOES HERE*/}
            <div className="contact-content-container">
                <h1 className="contact-header">
                    All Help Topics
                </h1>
                <div className="contact-content-sub">
                    <motion.div
                        className="contant-content-left"
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1}}
                        transition={{ duration: .8, ease: "easeOut" }}
                    >
                        <ul className="help-topics-list">
                            {Object.keys(descriptions).map((topic) => (
                                <li
                                    key={topic}
                                    onClick={() => setSelectedTopic(topic as keyof typeof descriptions)}
                                    className={selectedTopic === topic ? "active-topic" : ""}
                                >
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right side content */}
                    <motion.div
                        className="contant-content-right"
                        initial={{ opacity: 0,}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .8, ease: "easeOut" }}
                    >
                        {descriptions[selectedTopic].map((item) => {
                            const contentRef = useRef<HTMLDivElement>(null);

                            return (
                                <motion.div
                                    key={item.title}
                                    className="dropdown-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    <motion.div
                                        className="dropdown-header"
                                        onClick={() => toggleCard(item.title)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <span>{item.title}</span>
                                        <IoIosArrowDropdownCircle
                                            className={`dropdown-icon ${expandedCard === item.title ? "expanded" : ""}`}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="dropdown-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: expandedCard === item.title ? contentRef.current?.scrollHeight : 0,
                                            opacity: expandedCard === item.title ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div ref={contentRef} style={{ padding: "10px 15px" }}>
                                            {item.content}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Section for the Meet */}
            <div className="mg-container">
                <h1>Book a Meet & Greet</h1>
                <div className="mg-content-container">
                    <div className="mg-content-form">
                        <motion.form
                            onSubmit={handleMeetAndGreetSubmit}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.div
                                className="mg-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <IoPerson />
                                <input type="text" placeholder="First Name" className="mg-input"  />
                            </motion.div>

                            <motion.div
                                className="mg-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <IoPerson />
                                <input type="text" placeholder="Last Name" className="mg-input"  />
                            </motion.div>

                            <motion.div
                                className="mg-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <MdLocalPhone />
                                <input type="tel" placeholder="Phone" className="mg-input"  />
                            </motion.div>

                            <motion.div
                                className="mg-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <input type="date" placeholder="Date" className="mg-input"  />
                            </motion.div>

                            <motion.div
                                className="mg-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <input type="time" placeholder="Time" className="mg-input"  />
                            </motion.div>

                            <motion.div
                                className="mg-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: .8 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <textarea placeholder="Occasion" className="mg-textarea" style={{ resize: 'none' }} ></textarea>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="mg-button"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1}}
                                transition={{ duration: 0.5, delay: .82 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                Book
                            </motion.button>
                        </motion.form>
                    </div>
                    <div className="mg-content-image">
                        <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop
                        className="mg-swiper">
                          
                            {mg_pics.slice(0, 4).map((pic, index) => (
                            <SwiperSlide key={index}>
                                <img src={pic.imageUrl} alt={`Meet & Greet ${index + 1}`} className="mg-image" />
                            </SwiperSlide>
                          ))}
                        
                        </Swiper>
                       
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-container">
                <h1>Sign up for our Newsletter</h1>
                <div className="newsletter-content-container">
                    <div className="newsletter-content-form">
                        <motion.form
                            onSubmit={handleNewsletterSubmit}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.div
                                className="newsletter-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <IoPerson />
                                <input type="text" placeholder="First Name" className="newsletter-input"  />
                            </motion.div>

                            <motion.div
                                className="newsletter-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <IoPerson />
                                <input type="text" placeholder="Last Name" className="newsletter-input"  />
                            </motion.div>

                            <motion.div
                                className="newsletter-input-with-icon"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <MdEmail />
                                <input type="email" placeholder="Email" className="newsletter-input"  />
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="newsletter-button"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1}}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                Sign Up
                            </motion.button>
                        </motion.form>
                    </div>
                    <div className="newsletter-content-image">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            loop
                            className="newsletter-swiper">
                            {mg_pics.slice(4, 7).map((pic, index) => (
                                <SwiperSlide key={index}>
                                    <img src={pic.imageUrl} alt={`Meet & Greet ${index + 1}`} className="mg-image" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="contact_info_container">

                <motion.div
                    className="contact_info_title"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Contact Stage Fright
                </motion.div>

                <motion.div
                    className="contact_info_phone"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
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


                <motion.div
                    className="contact_info_email"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
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

                <motion.div
                    className="contact_info_message"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="message_title">Send a Message</h2>
                    <div className="message_sub">
                        <motion.form
                            className="name_field"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </motion.form>

                        <motion.form
                            className="number_field"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <input
                                type="tel"
                                id="number"
                                placeholder="Enter your phone number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </motion.form>

                        <motion.form
                            className="email_field"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </motion.form>

                        <motion.form
                            className="message_field"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <textarea
                                id="message"
                                placeholder="Enter your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ whiteSpace: 'pre-wrap', resize: 'none' }}
                            />
                        </motion.form>
                        <motion.button
                            className="send_button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true, amount: 0.3 }}
                            onClick={(e) => {
                                e.preventDefault();
                                if (!name || !number || !email || !message) {
                                    toast.error("Please fill out all fields before sending.", {
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
                                        },
                                    });
                                    return;
                                }
                                reset();
                            }}
                        >
                            Send
                        </motion.button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}