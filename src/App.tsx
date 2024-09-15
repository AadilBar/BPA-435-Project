import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/navbar.tsx';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Store from './pages/Store.tsx';
import Tour from './pages/Tour.tsx';

function App() {
    return (
        <ChakraProvider>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/tour" element={<Tour />} />
                    <Route path="/store" element={<Store />} />
                </Routes>
            </HashRouter>
        </ChakraProvider>
    );
}

export default App;
