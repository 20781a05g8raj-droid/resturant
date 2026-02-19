import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "Elena Rodriguez",
    dish: "Omakase Nigiri",
    rating: 5,
    text: "The Omakase was an absolute masterpiece. The freshness of the fish paired with the chef's precision made for an unforgettable evening.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Thomas Weber",
    dish: "Thai Green Curry",
    rating: 5,
    text: "Authentic heat and creamy coconut richness. It transported me back to Bangkok. Highly recommend the beef option!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    dish: "Dragon Roll",
    rating: 4,
    text: "A visual delight and a flavor explosion. The unagi sauce gives it that perfect sweet finish. Service was impeccable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  }
];

export const HomeReviews: React.FC = () => {
  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden border-t border-stone-800">
        {/* Background Texture/Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c59d5f_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                 <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-[1px] w-12 bg-[#c59d5f]"></div>
                    <span className="text-gold-500 font-script text-3xl block">Guest Experiences</span>
                    <div className="h-[1px] w-12 bg-[#c59d5f]"></div>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-white">What People Are Saying</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <motion.div 
                        key={review.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="bg-stone-800/40 backdrop-blur-sm p-8 rounded-sm border border-stone-700 relative group hover:border-gold-500/50 hover:bg-stone-800/60 transition-all duration-300"
                    >
                        <Quote className="absolute top-4 right-4 text-stone-700 group-hover:text-gold-500/20 transition-colors" size={40} />
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-stone-600 group-hover:border-gold-500 transition-colors" />
                                <div className="absolute -bottom-1 -right-1 bg-gold-500 text-stone-900 rounded-full p-0.5">
                                    <Star size={10} fill="currentColor" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold font-display text-lg text-white group-hover:text-gold-400 transition-colors">{review.name}</h4>
                                <p className="text-xs text-stone-400 uppercase tracking-wider">Review for: <span className="text-gold-500 font-bold">{review.dish}</span></p>
                            </div>
                        </div>

                        <div className="flex text-gold-500 mb-4 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-stone-600"} />
                            ))}
                        </div>

                        <p className="text-stone-300 italic font-serif leading-relaxed">"{review.text}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};