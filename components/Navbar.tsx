import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || location.pathname !== '/' ? 'bg-stone-900/95 shadow-xl py-2 backdrop-blur-sm' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <Link to="/" className="flex flex-col items-center">
              <span className="font-display text-2xl md:text-3xl text-white tracking-widest leading-none group-hover:text-gold-400 transition-colors">NOSSO</span>
              <div className="flex items-center gap-2 leading-none mt-1">
                <span className="font-display text-xl md:text-2xl text-gold-500 tracking-wider">SUSHI</span>
                <span className="font-script text-2xl md:text-3xl text-brand-red">&</span>
                <span className="font-display text-xl md:text-2xl text-white tracking-wider group-hover:text-gold-400 transition-colors">THAI</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-sm uppercase tracking-widest transition-colors font-semibold ${
                   location.pathname === link.path ? 'text-gold-500' : 'text-white hover:text-gold-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center text-white ml-4 border-l border-stone-600 pl-6">
              <Phone size={16} className="text-gold-500 mr-2" />
              <div className="flex flex-col">
                 <span className="text-xs text-stone-400 uppercase tracking-wider">Reservations</span>
                 <span className="text-sm font-bold tracking-wide">+351 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold-500 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-stone-900 shadow-2xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-8 space-y-6 flex flex-col items-center bg-stone-900 border-t border-stone-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-display text-xl uppercase tracking-widest py-2 ${
                  location.pathname === link.path ? 'text-gold-500' : 'text-white hover:text-gold-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-stone-800 w-full text-center">
            <p className="text-stone-400 mb-2">Montijo, Portugal</p>
            <p className="text-gold-500 font-bold text-xl">+351 123 456 789</p>
          </div>
        </div>
      </div>
    </nav>
  );
};