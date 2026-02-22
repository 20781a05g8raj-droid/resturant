import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { MenuHighlights } from '../components/MenuHighlights';
import { HomeAbout } from '../components/HomeAbout';
import { HomeReviews } from '../components/HomeReviews';
import { HomeReservation } from '../components/HomeReservation';
import { AnimatedDivider } from '../components/SvgAnimations';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#faf7f2]"
    >
      <Hero />
      <div className="bg-stone-900">
        <AnimatedDivider />
      </div>
      <Features />
      <MenuHighlights />
      <HomeAbout />
      <HomeReviews />
      <HomeReservation />
    </motion.div>
  );
};