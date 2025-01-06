import { Link, Navigate } from "react-router";
import useLogin from "../Auth/functions";
import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { getDatabase, ref, set } from "firebase/database";

export default function SignUp() {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passVisible, setPassVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);


    const {
        email,
        password,
        user,
        Name,
        setName,
        Phone,
        setPhone,
        DateOfBirth,
        setDateOfBirth,
        createAccountStatus,
        handleEmailChange,
        handlePasswordChange,
        handleCreateAccount,
        handleLogin,
      } = useLogin();
      
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontSize: '1.2em', marginTop: '150px', fontFamily: 'Sansation', fontWeight: 700 }}>
            <form style={{ display: 'flex', flexDirection: 'column', width: '400px', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '10px' }}>Name:</label>
                    <input type="text" id="name" name="name" required style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
                    <input type="email" id="email" name="email" required style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={handleEmailChange}/>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="dob" style={{ display: 'block', marginBottom: '10px' }}>Date of Birth:</label>
                    <input type="date" id="dob" name="dob" required style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={(e) => setDateOfBirth(e.target.value)}/>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '10px' }}>Phone (optional):</label>
                    <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                {password.length < 8 && (
                    <div style={{ marginBottom: '20px', color: 'red', fontSize: '0.9em' }}>
                        Password must be at least 8 characters long.
                    </div>
                )}
                {password !== confirmPassword && (
                    <div style={{ marginBottom: '20px', color: 'red', fontSize: '0.9em' }}>
                        Passwords do not match.
                    </div>
                )}
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
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '10px' }}>Confirm Password:</label>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="password" id="confirmPassword" name="confirmPassword" required style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <IconButton
                        onClick={
                            () => {
                                const passwordField = document.getElementById('confirmPassword') as HTMLInputElement;
                                if (passwordField && passwordField.type === 'password') {
                                    passwordField.type = 'text';
                                    setConfirmPassVisible(true);
                                } else {
                                    passwordField.type = 'password';
                                    setConfirmPassVisible(false);
                                }
                            }
                        }
                        backgroundColor="#000000"
                        color="white"
                        >
                            {(confirmPassVisible) ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                    </div>
                </div>
                {<button type="submit" style={{ padding: '15px', backgroundColor: '#E9204F', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1em' }}  onClick={(e) => {
                    pushUserInfo();
                    handleCreateAccount();
                    handleLogin();
                    setConfirmPassword("");
                    e.preventDefault();
                }}>Sign Up</button>}
            </form>
            <button style={{ marginTop: '30px', padding: '8px', backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}/images/Google.png`} alt="Google" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                Sign Up with Google
            </button>
            {user && <Navigate to="/"/>}
            <p style={{ marginTop: '30px', fontSize: '1em' }}>
                Already have an account? <Link to="/login" style={{ color: '#007BFF' }}>Login</Link>
            </p>
            <p style={{ marginTop: '30px', fontSize: '1em' }}>{createAccountStatus}</p>
            <p style={{ marginTop: '30px', fontSize: '1em' }}>{email}</p>
            <p style={{ marginTop: '30px', fontSize: '1em' }}>{password}</p>
            <p style={{ marginTop: '30px', fontSize: '1em' }}>{createAccountStatus}</p>
            <p style={{ marginTop: '30px', fontSize: '1em' }}>{createAccountStatus}</p>
        </div>
    );

    
  function pushUserInfo() {
    const db = getDatabase();

    const usersRef = ref(db, "users/" + email.replace('.', ',') );
    set(usersRef, {
        email: email,
        Name: Name,
        Phone: Phone,
        DateOfBirth: DateOfBirth,
        Cart: {}
    });

}
}


