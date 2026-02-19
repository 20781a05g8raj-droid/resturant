import React from 'react';
import { Reservation as ReservationComponent } from '../components/Reservation';
import { motion } from 'framer-motion';

export const Reservations: React.FC = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 bg-stone-100 min-h-screen"
    >
         <div className="bg-stone-900 py-16 text-center relative overflow-hidden mb-8">
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
             <div className="relative z-10">
                <span className="text-gold-500 font-script text-3xl mb-2 block">Join Us</span>
                <h1 className="text-5xl font-display font-bold text-white">Reservations</h1>
             </div>
        </div>
      <ReservationComponent />
    </motion.div>
  );
};