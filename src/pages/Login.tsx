import '../CSS/Login.css'; 
import { MdEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion"; 

export default function Login() {
  const [passVisible, setPassVisible] = useState(false); 

  return (
    <div className="login-container-page">
      <motion.div 
        className="form-container"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className='login-first-heading'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Login
        </motion.h1>
        <motion.h1 
          className='login-second-heading'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Welcome Back!
        </motion.h1>
        <div className="input-container">
          <form className="email-password-form" style={{marginTop: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px' }}> {/*This div is here because I'm doing a flex gap DO NOT DELETE*/}
              <label htmlFor="email-input" style={{fontSize: '1.1rem'}}>Email:</label>
              <div className="input-with-icon">{/*Putting DIV because thats how I'm putting the icon and input in same line */}
                <MdEmail className="input-icon" />
                <input className="email-input" type="email" placeholder="Enter Your Email" required />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px' }}> {/*This div is here because I'm doing a flex gap DO NOT DELETE*/}
              <label htmlFor="password-input"style={{fontSize: '1.1rem', }}>Password:</label>
              <div className="input-with-icon"> {/*Putting DIV because thats how I'm putting the icon and input in same line */}
                <MdOutlineLock className="input-icon" />
                <input
                  className="password-input"
                  type={passVisible ? "text" : "password"} 
                  placeholder="Enter Your Password"
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
              </div>
            </div>
            <motion.button 
              type="submit" 
              className='Login-submit'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
          </form>
          <motion.p 
            className="signup-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
