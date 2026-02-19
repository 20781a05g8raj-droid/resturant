import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuData';

export const MenuHighlights: React.FC = () => {
  const navigate = useNavigate();

  // Select specific signature dishes by ID to showcase (Omakase, Dragon Roll, Thai Green Curry)
  const signatureDishes = menuItems.filter(item => [5, 6, 7].includes(item.id));

  return (
    <section id="menu-highlights" className="py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Separators */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-16 bg-[#d4af37] opacity-50"></div>
            <div className="text-[#d4af37] opacity-70">
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5C5 5 5 0 10 0C15 0 15 5 20 5C15 5 15 10 10 10C5 10 5 5 0 5Z" fill="currentColor"/>
                </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-script text-stone-900 px-4">Our Signature Dishes</h2>
            <div className="text-[#d4af37] opacity-70">
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5C5 5 5 0 10 0C15 0 15 5 20 5C15 5 15 10 10 10C5 10 5 5 0 5Z" fill="currentColor"/>
                </svg>
            </div>
            <div className="h-[1px] w-16 bg-[#d4af37] opacity-50"></div>
          </div>
          <p className="text-stone-600 font-sans font-bold tracking-wider text-sm">Discover Our Specialties</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {signatureDishes.map((dish, index) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => navigate(`/menu/${dish.id}`)}
              className="bg-white shadow-lg rounded-sm overflow-hidden cursor-pointer group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-stone-900 text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg uppercase tracking-widest">
                        View Details
                    </span>
                </div>
              </div>
              <div className="p-6 text-center border-t-4 border-gold-500 bg-white transition-colors group-hover:bg-stone-50">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1 group-hover:text-gold-600 transition-colors">{dish.name}</h3>
                <div className="h-[1px] w-16 bg-stone-200 mx-auto my-3"></div>
                <p className="text-stone-500 font-sans text-sm mb-3 line-clamp-2 h-10">{dish.description}</p>
                <span className="font-bold text-stone-900 text-lg">€{dish.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button onClick={() => navigate('/menu')} variant="dark">
            View Full Menu
          </Button>
        </div>

      </div>
    </section>
  );
};