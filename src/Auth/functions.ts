import { useEffect, useState } from "react";
import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth} from "../Firebase/Firebase.ts";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [createAccountStatus, setCreateAccountStatus] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");
  const [DateOfBirth, setDateOfBirth] = useState<string>("");

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
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setDateOfBirth("");
      setLoginStatus("Logged in successfully.");
    } catch (error: any) {
      setLoginStatus(`Error signing in: ${error.message}`);
    }
  };

  const handleCreateAccount = async (): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setDateOfBirth("");
      setCreateAccountStatus("Account Created successfully.");
    } catch (error: any) {
      setCreateAccountStatus(`Error Creating Account: ${error.message}`);
    }
  };

  // Handle signout button click
  const handleSignout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      setLoginStatus("Logged out successfully.");
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
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