import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LuxuryBackground } from './SvgAnimations';

const heroImages = [
  "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop", // Sushi Dark
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", // Thai Spices
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", // Ambiance
  "https://images.unsplash.com/photo-1617196019294-dc44dfac01d5?q=80&w=2070&auto=format&fit=crop"  // Plating
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Slides every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900"
    >
      <LuxuryBackground />
      {/* Background Slider */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Image with slight scale to prevent white edges during transition */}
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-[1.02]"
            style={{ backgroundImage: `url("${img}")` }}
          />
          {/* Overlays for Text Readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
        </div>
      ))}

      {/* Manual Navigation Controls (Arrows) - Hidden on Mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white hover:bg-black/20 p-3 rounded-full transition-all duration-300 hidden md:block backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white hover:bg-black/20 p-3 rounded-full transition-all duration-300 hidden md:block backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight size={40} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex
                ? 'bg-gold-500 w-8'
                : 'bg-white/50 w-2 hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Logo Representation in Hero */}
          <div className="flex flex-col items-center mb-6">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-widest leading-tight drop-shadow-2xl">
              NOSSO
            </h1>
            <div className="flex items-center gap-3 md:gap-6 mt-2">
              <span className="font-display text-4xl md:text-6xl lg:text-7xl text-gold-500 tracking-wider drop-shadow-xl">SUSHI</span>
              <span className="font-script text-5xl md:text-7xl lg:text-8xl text-brand-red drop-shadow-xl">&</span>
              <span className="font-display text-4xl md:text-6xl lg:text-7xl text-white tracking-wider drop-shadow-xl">THAI</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-serif text-stone-300 italic tracking-wider">
            Montijo, Portugal
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-stone-400 font-sans tracking-[0.2em] uppercase text-sm md:text-base mb-10"
        >
          Authentic Flavors • Modern Fusion • Premium Quality
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-row justify-center items-center gap-3 w-full px-2 sm:w-auto sm:gap-6 sm:px-0"
        >
          <Button
            onClick={() => scrollTo('menu-highlights')}
            variant="primary"
            className="border-2 border-gold-500 flex-1 sm:flex-none !px-4 sm:!px-8 text-xs sm:text-sm whitespace-nowrap"
          >
            Explore Menu
          </Button>
          <Button
            onClick={() => scrollTo('reservations')}
            variant="outline"
            className="border-stone-300 text-stone-200 hover:bg-white hover:text-black flex-1 sm:flex-none !px-4 sm:!px-8 text-xs sm:text-sm whitespace-nowrap"
          >
            Book a Table
          </Button>
        </motion.div>
      </div>
    </section>
  );
};