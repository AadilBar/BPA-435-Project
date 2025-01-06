import { Link, Navigate } from "react-router";
import Footer from "../components/footer";
import useLogin from "../Auth/functions";
import Home from "./Home";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {

    const [passVisible, setPassVisible] = useState(false);

    const {
        email,
        password,
        user,
        loginStatus,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
      } = useLogin();

    return (

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontSize: '1.2em', fontFamily: 'Sansation', fontWeight: 700 }}>
                <form style={{ display: 'flex', flexDirection: 'column', width: '400px', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
                        <input type="email" id="email" name="email" required style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={handleEmailChange}/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '10px' }}>Password:</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="password" id="password" name="password" required style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={handlePasswordChange}/>
                        <IconButton
                        onClick={
                            () => {
                                const passwordField = document.getElementById('password') as HTMLInputElement;
                                if (passwordField && passwordField.type === 'password') {
                                    passwordField.type = 'text';
                                    setPassVisible(true);
                                } else {
                                    passwordField.type = 'password';
                                    setPassVisible(false);
                                }
                            }
                        }
                        backgroundColor="#000000"
                        color="white"
                        >
                            {(passVisible) ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                    </div>
                    </div>
                    <button onClick={handleLogin} type="submit" style={{ padding: '15px', backgroundColor: '#E9204F', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1em' }}>Login</button>
                </form>
                <button style={{ marginTop: '30px', padding: '8px', backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
                    <img src={`${import.meta.env.BASE_URL}/images/Google.png`} alt="Google" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    Login with Google
                </button>
                {user && <Navigate to="/"/>}
                <p style={{ marginTop: '30px', fontSize: '1em' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign up</Link>
                </p>
                <p style={{ marginTop: '30px', fontSize: '1em' }}>{loginStatus}</p>
            </div>
    );
}
