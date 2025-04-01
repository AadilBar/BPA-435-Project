import Navbar from './components/navbar.tsx';
import { Route, Routes, HashRouter, useLocation } from 'react-router'; // Add useLocation
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Store from './pages/Store.tsx';
import Tour from './pages/Tour.tsx';
import Contact from './pages/Contact.tsx';
import Checkout from './pages/Checkout.tsx';
import Tour_details from './pages/Tour_details.tsx';
import { Provider } from './components/ui/provider.tsx';
import './app.css';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import { User } from 'firebase/auth';
import { auth } from './Firebase/Firebase.ts';
import Cart from './pages/Cart.tsx';
import Payment from './pages/Payment.tsx';
import { createContext, useEffect, useState, useRef } from 'react';
import React from 'react';
import Terms from './pages/Terms.tsx';
import Privacy from './pages/Privacy.tsx';
import Account from './pages/Account.tsx';
import OrderCompletion from './pages/Order_Completion.tsx';
import GeminiChatComponent from './components/GeminiChat.tsx';
import Albums from './pages/albums.tsx';
import Lenis from '@studio-freight/lenis';

const UserContext = createContext<{ user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> }>({ user: null, setUser: () => {} });

function App() {
  const lenis = useRef<Lenis>();
  const location = useLocation(); // Hook to detect route changes

  // Initialize Lenis
  useEffect(() => {
    lenis.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    });

    const raf = (time: number) => {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.current?.destroy();
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenis.current) {
      lenis.current.scrollTo(0, { immediate: true }); // Scroll to top instantly
    }
  }, [location.pathname]); // Trigger when the route changes

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user1: User | null) => {
      setUser(user1);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Provider>
        <div style={{ position: "fixed", top: 0, width: '100%', zIndex: 1000 }}>
          <Navbar />
          <GeminiChatComponent />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tour_details" element={<Tour_details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/account" element={<Account />} />
          <Route path="/completion" element={<OrderCompletion />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </Provider>
    </UserContext.Provider>
  );
}

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff0000' }}>404 Page Not Found</h1>
      <p style={{ fontSize: '1.5rem' }}>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export { UserContext };
export default function AppWrapper() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}