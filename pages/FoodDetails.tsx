import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Star, Leaf, Flame, Activity, MessageCircle, Share2, Heart, Clock, ChefHat, User, Send } from 'lucide-react';
import { Button } from '../components/Button';

// Interface for local review state
interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition' | 'reviews'>('ingredients');

  const item = menuItems.find(i => i.id === Number(id));

  // Local state for reviews (starting with dummy data)
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, author: "Sarah J.", rating: 5, text: "The flavors were absolutely incredible. Highly recommend trying this!", date: "2 days ago" },
    { id: 2, author: "Mike T.", rating: 5, text: "Best I've had in years. Presentation was spot on.", date: "1 week ago" }
  ]);

  // Form state
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Item Not Found</h2>
        <Button onClick={() => navigate('/menu')}>Back to Menu</Button>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    setIsSubmittingReview(true);

    // Simulate network delay
    setTimeout(() => {
        const review: Review = {
            id: Date.now(),
            author: newReview.name,
            rating: newReview.rating,
            text: newReview.text,
            date: "Just now"
        };
        setReviews([review, ...reviews]);
        setNewReview({ name: '', rating: 5, text: '' });
        setIsSubmittingReview(false);
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 min-h-screen bg-[#faf7f2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/menu')} 
            className="flex items-center gap-2 text-stone-600 hover:text-gold-600 transition-colors font-bold uppercase tracking-wider text-sm group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Menu
          </button>
          
          <div className="flex gap-4">
             <button className="p-2 rounded-full hover:bg-white hover:shadow-md text-stone-400 hover:text-red-500 transition-all">
                <Heart size={20} />
             </button>
             <button className="p-2 rounded-full hover:bg-white hover:shadow-md text-stone-400 hover:text-stone-900 transition-all">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side: Image & Visuals */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-square bg-white border-4 border-white">
               <img 
                 src={item.image} 
                 alt={item.name} 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
               />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-stone-900 shadow-lg border border-stone-100">
                  {item.category}
               </div>
            </div>
            
            {/* Quick Stats below image */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-stone-100">
                    <Clock size={20} className="mx-auto text-gold-500 mb-2" />
                    <span className="block text-xs text-stone-400 uppercase tracking-wide">Prep Time</span>
                    <span className="font-bold text-stone-800">15-20 min</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-stone-100">
                    <Flame size={20} className="mx-auto text-brand-red mb-2" />
                    <span className="block text-xs text-stone-400 uppercase tracking-wide">Calories</span>
                    <span className="font-bold text-stone-800">
                        {item.nutrition?.split('•')[0].trim().replace('kcal', '') || '350'}
                    </span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-stone-100">
                    <ChefHat size={20} className="mx-auto text-stone-800 mb-2" />
                    <span className="block text-xs text-stone-400 uppercase tracking-wide">Chef's</span>
                    <span className="font-bold text-stone-800">Special</span>
                </div>
            </div>
          </motion.div>

          {/* Right Side: Details & Actions */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
             <div className="mb-2 flex items-center gap-2">
                <div className="flex text-gold-500">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(item.rating || 5) ? "currentColor" : "none"} strokeWidth={s <= Math.round(item.rating || 5) ? 0 : 1} />)}
                </div>
                <span className="text-sm font-bold text-stone-900">{item.rating}</span>
                <span className="text-sm text-stone-400">({reviews.length} reviews)</span>
             </div>

             <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-4 leading-tight">
               {item.name}
             </h1>
             
             <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold text-stone-900">€{item.price}</span>
             </div>

             <p className="text-lg text-stone-600 font-serif italic mb-8 leading-relaxed border-l-4 border-gold-500 pl-4">
                "{item.description}"
             </p>

             {/* Tabs Navigation */}
             <div className="flex gap-8 border-b border-stone-200 mb-8 overflow-x-auto">
                {['ingredients', 'nutrition', 'reviews'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-3 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                            activeTab === tab ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-900" />
                        )}
                    </button>
                ))}
             </div>

             {/* Tab Content */}
             <div className="flex-1 mb-8 min-h-[150px]">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                 >
                    {activeTab === 'ingredients' && (
                        <div>
                             <h3 className="flex items-center gap-2 font-bold text-stone-900 mb-4">
                                <Leaf size={18} className="text-green-600" /> Key Ingredients
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {item.ingredients?.map((ing, idx) => (
                                    <span key={idx} className="bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm font-medium border border-stone-200">
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'nutrition' && (
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-stone-900 mb-4">
                                <Activity size={18} className="text-brand-red" /> Health Benefits
                            </h3>
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-4 inline-block font-bold text-red-800 text-sm">
                                {item.nutrition}
                            </div>
                            <ul className="space-y-3">
                                {item.benefits?.map((b, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-stone-600">
                                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                         <div className="space-y-8">
                             
                             {/* Write Review Form */}
                             <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                                <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                                    <MessageCircle size={18} /> Write a Review
                                </h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[1,2,3,4,5].map(star => (
                                            <button 
                                                type="button"
                                                key={star} 
                                                onClick={() => setNewReview({...newReview, rating: star})}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star 
                                                    size={24} 
                                                    fill={star <= newReview.rating ? "#c59d5f" : "none"} 
                                                    className={star <= newReview.rating ? "text-gold-500" : "text-stone-300"}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm text-stone-500 font-medium">Select Rating</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold-500"
                                        required
                                    />
                                    <textarea 
                                        placeholder="Share your experience..."
                                        value={newReview.text}
                                        onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold-500 h-24 resize-none"
                                        required
                                    ></textarea>
                                    <button 
                                        type="submit"
                                        disabled={isSubmittingReview}
                                        className="w-full bg-stone-900 text-white font-bold py-2 rounded-lg hover:bg-gold-600 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmittingReview ? 'Submitting...' : 'Post Review'} <Send size={14} />
                                    </button>
                                </form>
                             </div>

                             {/* Reviews List */}
                             <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                 <AnimatePresence>
                                     {reviews.map((review) => (
                                         <motion.div 
                                            key={review.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm"
                                         >
                                             <div className="flex justify-between items-start mb-2">
                                                 <div className="flex items-center gap-2">
                                                     <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400">
                                                         <User size={16} />
                                                     </div>
                                                     <div>
                                                         <span className="font-bold text-sm block leading-none text-stone-900">{review.author}</span>
                                                         <span className="text-[10px] text-stone-400">{review.date}</span>
                                                     </div>
                                                 </div>
                                                 <div className="flex text-gold-400">
                                                     {[1,2,3,4,5].map(s => (
                                                         <Star key={s} size={12} fill={s <= review.rating ? "currentColor" : "none"} strokeWidth={s <= review.rating ? 0 : 1} />
                                                     ))}
                                                 </div>
                                             </div>
                                             <p className="text-sm text-stone-600 italic leading-relaxed">"{review.text}"</p>
                                         </motion.div>
                                     ))}
                                 </AnimatePresence>
                             </div>
                         </div>
                    )}
                 </motion.div>
             </div>

             {/* Action Buttons */}
             <div className="flex gap-4 mt-auto">
                 <Button 
                    onClick={() => {
                        addToCart({ ...item, quantity: 1 });
                        navigate('/menu');
                    }}
                    className="flex-1 justify-center py-4 text-base"
                 >
                     Add to Order - €{item.price}
                 </Button>
             </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};