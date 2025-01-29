import Navbar from './components/navbar.tsx';
import { Route, Routes, HashRouter } from 'react-router';
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
import { createContext, useEffect, useState } from 'react';
import React from 'react';
import Terms from './pages/Terms.tsx';
import Privacy from './pages/Privacy.tsx';
import Account from './pages/Account.tsx';

const UserContext = createContext<{ user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> }>({ user: null, setUser: () => {} });

function App() {

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
                <HashRouter>
                    <div style={{ position: "fixed", top: 0, width: '100%', zIndex: 1000 }}>
                        <Navbar />
                    </div>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/tour" element={<Tour />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/contact-us" element={<Contact />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/tour_details" element={<Tour_details />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<SignUp/>} />
                        <Route path="/cart" element={<Cart/>} />
                        <Route path="/payment" element={<Payment/>} />    
                        <Route path="/terms" element={<Terms/>} />    
                        <Route path="/privacy" element={<Privacy/>} />
                        <Route path="/account" element={<Account/>} />        

                    </Routes>

                </HashRouter>
            </Provider>
        </UserContext.Provider>
    );

}

export {UserContext};
export default App;
