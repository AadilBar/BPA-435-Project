import '../CSS/SignUp.css'; 
import { IoPerson } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function SignUp() {
    const [passVisible, setPassVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);

    return (
        <div className="signup-container-page">
            <motion.div 
                className="signup-form-container"
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="signup-heading"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Create Account
                </motion.h1>
                <motion.h3 
                    className="signup-subheading"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Join Our Community Today
                </motion.h3>
                <div className="signup-input-container">
                    <form>
                        <motion.div 
                            className="signup-input-with-icon"
                           
                        >
                            <IoPerson className="signup-input-icon" />
                            <input type="text" placeholder="First Name" className="signup-input" required />
                        </motion.div>
                        <motion.div 
                            className="signup-input-with-icon"
                          
                        >
                            <IoPerson className="signup-input-icon" />
                            <input type="text" placeholder="Last Name" className="signup-input" required />
                        </motion.div>
                        <motion.div 
                            className="signup-input-with-icon"
                           
                        >
                            <FaCalendar className="signup-input-icon" />
                            <input type="text" placeholder="Date of Birth (MM/DD/YYYY)" className="signup-input" required />
                        </motion.div>
                        <motion.div 
                            className="signup-input-with-icon"
                          
                        >
                            <MdLocalPhone className="signup-input-icon" />
                            <input type="text" placeholder="Phone (Optional)" className="signup-input" />
                        </motion.div>
                        <motion.div 
                            className="signup-input-with-icon"
                           
                        >
                            <FaLocationDot className="signup-input-icon" />
                            <input type="text" placeholder="Address" className="signup-input" required />
                        </motion.div>
                        <motion.div 
                            className="signup-input-with-icon"
                            
                        >
                            <MdOutlineLock className="signup-input-icon" />
                            <input
                                type={passVisible ? "text" : "password"}
                                placeholder="Password"
                                className="signup-input"
                                required
                            />
                            <span
                                onClick={() => setPassVisible(!passVisible)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: '#E9204F',
                                }}
                            >
                                {passVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </motion.div>
                        <motion.div 
                            className="signup-input-with-icon"
                           
                        >
                            <MdOutlineLock className="signup-input-icon" />
                            <input
                                type={confirmPassVisible ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="signup-input"
                                required
                            />
                            <span
                                onClick={() => setConfirmPassVisible(!confirmPassVisible)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: '#E9204F',
                                }}
                            >
                                {confirmPassVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </motion.div>
                        <motion.button 
                            type="submit" 
                            className="signup-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign Up
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}


