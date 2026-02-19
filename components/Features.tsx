import React from 'react';
import { Utensils, Leaf, Wine } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Utensils size={40} strokeWidth={1} />,
    title: "Exquisite Cuisine",
    description: "Delicious & innovative dishes"
  },
  {
    icon: <Leaf size={40} strokeWidth={1} />,
    title: "Fresh Ingredients",
    description: "Sourced locally & sustainably"
  },
  {
    icon: <Wine size={40} strokeWidth={1} />,
    title: "Elegant Ambiance",
    description: "Relaxing & sophisticated setting"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 bg-[#faf7f2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-300/50">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center group pt-8 md:pt-0 px-4"
            >
              <div className="mb-4 text-stone-800 transition-transform duration-500 group-hover:-translate-y-1">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 tracking-wide">{feature.title}</h3>
              <p className="text-stone-500 font-sans text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};