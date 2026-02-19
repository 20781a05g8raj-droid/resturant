import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../types';
import { GoogleGenAI } from "@google/genai";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  // Starters
  { id: 1, name: "Gyoza Selection", description: "Pan-fried dumplings (chicken or vegetable) with sesame soy sauce.", price: 8, category: "starters" },
  { id: 2, name: "Tuna Tataki", description: "Seared fresh tuna with ponzu sauce and sesame seeds.", price: 14, category: "starters" },
  { id: 3, name: "Tom Kha Gai", description: "Coconut soup with chicken, galangal, and mushrooms.", price: 9, category: "starters" },
  { id: 4, name: "Vegetable Spring Rolls", description: "Crispy rolls served with sweet chili sauce.", price: 7, category: "starters" },
  
  // Mains - Sushi & Thai
  { id: 5, name: "Omakase Nigiri (12pcs)", description: "Chef's selection of premium fish on vinegared rice.", price: 28, category: "mains" },
  { id: 6, name: "Dragon Roll", description: "Tempura shrimp, avocado, topped with eel and unagi sauce.", price: 16, category: "mains" },
  { id: 7, name: "Green Curry", description: "Spicy thai green curry with coconut milk, bamboo shoots, and basil (Chicken/Beef/Tofu).", price: 17, category: "mains" },
  { id: 8, name: "Pad Thai", description: "Stir-fried rice noodles with egg, peanuts, bean sprouts, and tamarind sauce.", price: 15, category: "mains" },
  { id: 9, name: "Salmon Teriyaki", description: "Grilled salmon fillet with homemade teriyaki glaze and steamed rice.", price: 19, category: "mains" },
  
  // Desserts
  { id: 10, name: "Mango Sticky Rice", description: "Sweet sticky rice with fresh mango and coconut cream.", price: 9, category: "desserts" },
  { id: 11, name: "Mochi Ice Cream", description: "Selection of 3 flavors (Green Tea, Mango, Vanilla).", price: 7, category: "desserts" },
  { id: 12, name: "Thai Fried Banana", description: "Crispy battered banana drizzled with honey.", price: 6, category: "desserts" },
  
  // Drinks
  { id: 13, name: "Sake Junmai", description: "Premium Japanese rice wine (180ml).", price: 12, category: "drinks" },
  { id: 14, name: "Thai Iced Tea", description: "Sweet spiced tea with condensed milk.", price: 5, category: "drinks" },
];

export const FullMenuModal: React.FC<FullMenuModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('starters');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [errorAi, setErrorAi] = useState<string | null>(null);

  const getPairing = async (dishName: string) => {
    // Clear previous states
    setAiRecommendation(null);
    setErrorAi(null);

    if (!process.env.API_KEY) {
        setErrorAi("Sommelier is currently offline (API Key missing).");
        return;
    }

    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am at a high-end Sushi & Thai fusion restaurant. Suggest a drink pairing (sake, wine, or cocktail) for the dish "${dishName}". Keep the answer short (max 20 words) and sophisticated.`,
      });
      setAiRecommendation(response.text?.trim() || "A refreshing Asahi beer fits well.");
    } catch (error) {
      console.error("AI Error:", error);
      setErrorAi("Could not reach the sommelier.");
    } finally {
      setLoadingAi(false);
    }
  };

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-stone-50 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-sm shadow-2xl flex flex-col"
          >
            {/* Header - Fixed */}
            <div className="p-6 md:p-8 bg-white border-b border-stone-200 flex justify-between items-center z-10">
                <div>
                   <h2 className="text-3xl font-display font-bold text-stone-900">Our Menu</h2>
                   <p className="text-stone-500 text-sm">Sushi & Thai Specialties</p>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X size={28} className="text-stone-500" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              
              {/* Category Tabs */}
              <div className="flex justify-center flex-wrap gap-2 md:gap-6 mb-12 sticky top-0 bg-stone-50 py-4 z-10 -mx-6 px-6 shadow-sm md:shadow-none md:static md:bg-transparent md:p-0 md:mx-0">
                {['starters', 'mains', 'desserts', 'drinks'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                        setActiveCategory(cat as MenuItem['category']);
                        setAiRecommendation(null);
                        setErrorAi(null);
                    }}
                    className={`px-4 py-2 uppercase tracking-widest text-xs md:text-sm font-bold border rounded-full transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-stone-900 text-gold-500 border-stone-900 shadow-lg' 
                        : 'bg-white text-stone-500 border-stone-200 hover:border-gold-500 hover:text-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {filteredItems.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className="flex justify-between items-baseline mb-2 border-b border-stone-300 pb-1 border-dotted">
                      <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-gold-600 transition-colors">{item.name}</h3>
                      <span className="text-stone-900 font-bold">€{item.price}</span>
                    </div>
                    <p className="text-stone-600 text-sm mb-3">{item.description}</p>
                    
                    {/* AI Feature Button */}
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => getPairing(item.name)}
                            disabled={loadingAi}
                            className="text-[10px] uppercase tracking-wider font-bold text-gold-600 hover:text-stone-900 flex items-center gap-1 transition-colors border border-gold-200 px-2 py-1 rounded-sm hover:bg-gold-50"
                        >
                            <Sparkles size={10} />
                            {loadingAi ? "Consulting..." : "Pairing"}
                        </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* AI Recommendation Footer */}
            <AnimatePresence>
                {(aiRecommendation || errorAi) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`p-4 border-t ${errorAi ? 'bg-red-50 border-red-200' : 'bg-stone-900 border-stone-800'} text-center shrink-0 z-20`}
                    >
                        {errorAi ? (
                             <div className="flex items-center justify-center gap-2 text-red-800 text-sm">
                                <AlertCircle size={16} />
                                <span>{errorAi}</span>
                             </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Sparkles className="text-gold-500" size={14} />
                                    <span className="uppercase tracking-widest text-xs font-bold text-gold-500">Sommelier's Choice</span>
                                </div>
                                <p className="font-serif italic text-white text-base md:text-lg">"{aiRecommendation}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};