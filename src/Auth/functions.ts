import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { getDatabase } from "firebase/database";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [createAccountStatus, setCreateAccountStatus] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");
  const [DateOfBirth, setDateOfBirth] = useState<string>("");

  const database = getDatabase();
  const auth = getAuth();

  // Update state variables as the user types
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  // Handle login button click
  const handleLogin = async (): Promise<void> => {

    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // User is signed in, update the login status
      setLoginStatus("Logged in successfully.");
    } catch (error: any) {
      // Update the login status with the error message
      setLoginStatus(`Error signing in: ${error.message}`);
    }
  };

  const handleCreateAccount = async (): Promise<void> => {
    try {
      // Sign in with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setDateOfBirth("");


      // User is signed in, update the login status
      setCreateAccountStatus("Account Created successfully.");
    } catch (error: any) {
      // Update the login status with the error message
      setCreateAccountStatus(`Error Creating Account: ${error.message}`);
    }
  };

  // Handle signout button click
  const handleSignout = async (): Promise<void> => {
    try {
      // Sign out the user
      await signOut(auth);

      // Clear user data and update login status
      setUser(null);
      setLoginStatus("Logged out successfully.");
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };

  // Use Firebase Auth's onAuthStateChanged to check the user's login status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        // User is logged in, set the user data
        setUser(user);
      } else {
        // User is logged out, clear user data
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return {
    email,
    password,
    user,
    Name,
    setName,
    Phone,
    setPhone,
    DateOfBirth,
    setDateOfBirth,
    loginStatus,
    createAccountStatus,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleCreateAccount,
    handleSignout,
  };
};

export default useLogin;
