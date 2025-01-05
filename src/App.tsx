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

function App() {
    return (
        <Provider>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/tour" element={<Tour />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/tour_details" element={<Tour_details />} />
                </Routes>
            </HashRouter>
        </Provider>
    );
}

export default App;
