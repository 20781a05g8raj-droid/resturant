import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';

// Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { FoodDetails } from './pages/FoodDetails';
import { About } from './pages/About';
import { Reservations } from './pages/Reservations';
import { Contact } from './pages/Contact';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="bg-stone-50 min-h-screen flex flex-col">
          <ScrollToTop />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:id" element={<FoodDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;