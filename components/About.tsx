import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-800/50 skew-x-12 translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <span className="h-[1px] w-12 bg-gold-500"></span>
              <span className="text-gold-500 font-script text-3xl">Our Story</span>
              <span className="h-[1px] w-12 md:hidden bg-gold-500"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Where East Meets West</h2>
            
            <p className="text-stone-300 mb-6 leading-relaxed text-lg">
              Located in the heart of <span className="text-gold-400 font-semibold">Montijo, Portugal</span>, 
              <span className="font-display text-gold-500"> NOSSO</span> brings you a unique culinary journey.
              We blend the delicate art of Japanese Sushi with the vibrant, aromatic spices of Thailand.
            </p>
            <p className="text-stone-300 mb-8 leading-relaxed">
              Our chefs are masters of their craft, ensuring that every roll, curry, and stir-fry is a masterpiece of flavor and presentation. Whether you crave the fresh simplicity of sashimi or the complex heat of a red curry, you will find a home at our table.
            </p>
            
            <Button variant="primary">Read More</Button>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative rounded-sm overflow-hidden shadow-2xl group">
               <img 
                src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop" 
                alt="Sushi Chef" 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border-[1px] border-gold-500/50 m-4 pointer-events-none"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};