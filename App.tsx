import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CartDrawer } from './components/CartDrawer';
import { AdminLayout } from './admin/AdminLayout';

// Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { FoodDetails } from './pages/FoodDetails';
import { About } from './pages/About';
import { Reservations } from './pages/Reservations';
import { Contact } from './pages/Contact';

// Animations
import { LoadingScreen } from './components/SvgAnimations';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public layout wrapper
const PublicLayout: React.FC = () => (
  <>
    <ScrollToTop />
    <CartDrawer />
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <AuthProvider>
      <CartProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
          ) : (
            <HashRouter>
              <div className="bg-stone-50 min-h-screen flex flex-col">
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/*" element={<AdminLayout />} />

                  {/* Public Routes */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:id" element={<FoodDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/contact" element={<Contact />} />
                  </Route>
                </Routes>
              </div>
            </HashRouter>
          )}
        </AnimatePresence>
      </CartProvider>
    </AuthProvider>
  );
};

// We need AnimatePresence here
import { AnimatePresence } from 'framer-motion';

export default App;