import React from 'react';
import { About as AboutComponent } from '../components/About';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20"
    >
        <div className="bg-stone-900 py-16 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
             <div className="relative z-10">
                <span className="text-gold-500 font-script text-3xl mb-2 block">Our Tradition</span>
                <h1 className="text-5xl font-display font-bold text-white">About Nosso</h1>
             </div>
        </div>
      <AboutComponent />
      
      {/* Additional Content for specific page */}
      <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h3 className="text-3xl font-display font-bold mb-8">The Chef's Philosophy</h3>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                  "At Nosso, we believe that food is a universal language. By combining the precision of Japanese techniques with the bold soul of Thai cuisine, we create a dialogue on the plate that speaks to the heart."
              </p>
              <img 
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080&auto=format&fit=crop" 
                alt="Executive Chef" 
                className="w-full h-[30rem] md:h-[40rem] object-cover object-top rounded-sm shadow-xl" 
              />
          </div>
      </section>
    </motion.div>
  );
};