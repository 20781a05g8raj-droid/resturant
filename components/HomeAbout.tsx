import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const HomeAbout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
             <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <div className="h-[1px] w-12 bg-[#d4af37] opacity-50"></div>
                <div className="text-[#d4af37] opacity-70">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C5 5 5 0 10 0C15 0 15 5 20 5C15 5 15 10 10 10C5 10 5 5 0 5Z" fill="currentColor"/>
                    </svg>
                </div>
                <h2 className="text-5xl md:text-6xl font-script text-stone-900 px-2">About Us</h2>
                <div className="text-[#d4af37] opacity-70 md:hidden">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C5 5 5 0 10 0C15 0 15 5 20 5C15 5 15 10 10 10C5 10 5 5 0 5Z" fill="currentColor"/>
                    </svg>
                </div>
                <div className="h-[1px] w-12 bg-[#d4af37] opacity-50 md:hidden"></div>
             </div>
             
             <h3 className="text-xl font-sans font-bold text-stone-700 mb-6 pl-1">A Culinary Journey</h3>

             <p className="text-stone-600 mb-6 leading-relaxed">
              Experience the best in fine dining. Our passion for food and exceptional service ensures a memorable dining experience every time. At Nosso, we believe that food is not just about sustenance, but an art form that brings people together.
            </p>

            <div className="flex justify-center md:justify-start">
               <Button onClick={() => navigate('/about')}>
                  Learn More
               </Button>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="rounded-sm overflow-hidden shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant Interior" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};