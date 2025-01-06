// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxXkITg6FBLtodHZ7fZej5pwgxiDs0rNc",
  authDomain: "bpa-web-1d994.firebaseapp.com",
  projectId: "bpa-web-1d994",
  storageBucket: "bpa-web-1d994.firebasestorage.app",
  messagingSenderId: "81824784556",
  appId: "1:81824784556:web:be68cc61cedcd7d077ff09",
  measurementId: "G-Q2KXJTK4FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, firebaseConfig};