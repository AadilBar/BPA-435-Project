import { ChakraProvider, Stack } from '@chakra-ui/react';
import Navbar from './components/navbar.tsx';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Store from './pages/Store.tsx';
import Tour from './pages/Tour.tsx';
import Contact from './pages/Contact.tsx';
import Albums from './pages/Albums.tsx';
import './app.css';

function App() {
    return (
        <ChakraProvider>
            <HashRouter>
                <Stack>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/tour" element={<Tour />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/albums" element={<Albums />} />
                        <Route path="/contact-us" element={<Contact />} />
                    </Routes>
                </Stack>
            </HashRouter>
        </ChakraProvider>
    );
}

export default App;
