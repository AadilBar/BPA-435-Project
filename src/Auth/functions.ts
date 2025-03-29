import { useEffect, useState } from "react";
import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut, updatePassword, User } from "firebase/auth";
import { auth} from "../Firebase/Firebase.ts";
import { getDatabase, ref, set } from "firebase/database";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [createAccountStatus, setCreateAccountStatus] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");
  const [DateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };


  const handleLogin = async (): Promise<void> => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = `${window.location.origin}/#/`;
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
      if (password !== confirmPassword) {
        setCreateAccountStatus("Passwords do not match.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      pushUserInfo();

      setCreateAccountStatus("Account Created successfully.");
    } catch (error: any) {
      setCreateAccountStatus(`Error Creating Account: ${error.message}`);
    }
  };

  const handleUpdatePassword = async (): Promise<void> => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, password);
        setCreateAccountStatus("Password updated successfully.");
      } else {
        setCreateAccountStatus("No user is currently signed in.");
      }
    } catch (error: any) {
    }
  };

 
  const handleSignout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      setLoginStatus("Logged out successfully.");
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };


  function pushUserInfo() {
    const db = getDatabase();


    const usersRef = ref(db, "users/" + email.replace('.', ',') );
    set(usersRef, {
        email: email,
        Name: Name,
        Phone: Phone,
        DateOfBirth: DateOfBirth,
        Address: address, 
        cart: {
            totalItems: 0,
        },
        tours: {
            totalItems: 0,
        }

    });

    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setDateOfBirth("");
    setAddress("");
    window.location.href = `${window.location.origin}/#/`;
  }

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
    confirmPassword,
    user,
    Name,
    address,
    setName,
    Phone,
    setPhone,
    DateOfBirth,
    setDateOfBirth,
    loginStatus,
    createAccountStatus,
    handleEmailChange,
    handlePasswordChange,
    handleUpdatePassword,
    handleLogin,
    handleCreateAccount,
    handleSignout,
    setConfirmPassword,
    setAddress,
  };
};

export default useLogin;
