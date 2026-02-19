import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingBag, ChefHat, Sparkles, MapPin, Phone, CheckCircle2, Bike, Utensils, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { GoogleGenAI } from "@google/genai";

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState<{[key: string]: boolean}>({});
  
  // Use Global Context
  const { cart, customerInfo, setCustomerInfo, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, tax, total } = useCart();
  const navigate = useNavigate();

  // Filter Items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories = ['all', 'starters', 'mains', 'desserts', 'drinks'];

  const getAiPairing = async (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    if (!process.env.API_KEY) {
        alert("API Key missing");
        return;
    }
    setIsAiLoading(item.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Suggest a short, 5-word drink pairing for ${item.name}.`,
      });
      alert(`Sommelier suggests: ${response.text}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(null);
    }
  };

  const handlePlaceOrder = () => {
    // Validation
    const errors: {[key: string]: boolean} = {};
    if (!customerInfo.name) errors.name = true;
    
    if (customerInfo.type === 'Dine In' && !customerInfo.table) errors.table = true;
    if (customerInfo.type === 'Delivery') {
        if (!customerInfo.address) errors.address = true;
        if (!customerInfo.phone) errors.phone = true;
    }
    if (customerInfo.type === 'Takeaway' && !customerInfo.phone) errors.phone = true;

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
    }
    setFormErrors({});

    setOrderStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
        setOrderStatus('success');
        setTimeout(() => {
            clearCart();
            setOrderStatus('idle');
            setCustomerInfo({ ...customerInfo, name: '', phone: '', address: '', table: '' }); // Reset fields but keep type
        }, 3000);
    }, 1500);
  };

  const getOrderTypeIcon = () => {
    switch(customerInfo.type) {
        case 'Delivery': return <Bike size={18} />;
        case 'Takeaway': return <Package size={18} />;
        default: return <Utensils size={18} />;
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-[#faf7f2] flex flex-col lg:flex-row lg:overflow-hidden lg:h-screen relative">
      
      {/* LEFT SIDE - MENU */}
      <div className="flex-1 lg:h-full lg:overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-stone-900">Menu</h1>
            <p className="text-stone-500 text-sm mt-1">Select your favorite dishes</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder="Search foods..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-full shadow-sm focus:outline-none focus:border-gold-500 focus:shadow-md transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-gold-500 transition-colors" size={20} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shadow-sm ${
                activeCategory === cat 
                ? 'bg-stone-900 text-gold-500 shadow-lg scale-105' 
                : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 pb-20"
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                onClick={() => navigate(`/menu/${item.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-200 group flex flex-col cursor-pointer ring-offset-2 focus-within:ring-2 ring-gold-500/50"
              >
                {/* Image Area */}
                <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-stone-100">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-stone-800 shadow-sm z-10">
                     {item.category}
                   </div>
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-stone-900 text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                            View Details
                        </span>
                   </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif font-bold text-base text-stone-900 leading-tight">{item.name}</h3>
                    <span className="font-bold text-stone-900 text-sm">€{item.price}</span>
                  </div>
                  <p className="text-stone-500 text-xs mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between gap-2">
                     {/* AI Button */}
                     <button 
                        onClick={(e) => getAiPairing(e, item)}
                        className="p-2 rounded-full bg-stone-50 text-gold-600 hover:bg-gold-50 transition-colors border border-stone-100 z-10 relative"
                        title="Get Pairing Suggestion"
                     >
                       {isAiLoading === item.id ? <div className="w-4 h-4 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={14} />}
                     </button>

                     {/* Add Button */}
                     {cart.find(i => i.id === item.id) ? (
                        <div className="flex items-center bg-stone-900 rounded-full px-1 py-1 shadow-md z-10 relative" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-white hover:text-gold-500 transition-colors"><Minus size={12}/></button>
                          <span className="text-white font-bold text-xs w-4 text-center">{cart.find(i => i.id === item.id)?.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-white hover:text-gold-500 transition-colors"><Plus size={12}/></button>
                        </div>
                     ) : (
                        <button 
                          onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                          }}
                          className="flex-1 bg-stone-50 border border-stone-200 text-stone-800 font-bold text-[10px] uppercase tracking-wider py-2 rounded-full hover:bg-stone-900 hover:text-gold-500 hover:border-stone-900 transition-all shadow-sm flex items-center justify-center gap-2 z-10 relative"
                        >
                          Add
                        </button>
                     )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* RIGHT SIDE - CART */}
      <div className="w-full lg:w-[350px] xl:w-[400px] bg-white border-l border-stone-200 h-auto lg:h-full lg:overflow-y-auto flex flex-col shadow-2xl relative z-20">
        
        {/* Cart Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
           <h2 className="font-display font-bold text-xl text-stone-900 flex items-center gap-2">
             <ShoppingBag className="text-gold-500" size={20} /> Order Summary
           </h2>
           <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-md text-xs font-bold">
             ID: #{Math.floor(Math.random() * 10000)}
           </span>
        </div>

        {/* Customer Details Form */}
        <div className="p-6 border-b border-stone-100 space-y-4 bg-stone-50/50">
           
           {/* 1. ORDER TYPE (MOVED TO TOP) */}
           <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Order Type</label>
              <div className="grid grid-cols-3 gap-2 bg-stone-200 p-1 rounded-lg">
                  {['Dine In', 'Takeaway', 'Delivery'].map(type => (
                      <button
                        key={type}
                        onClick={() => setCustomerInfo({...customerInfo, type})}
                        className={`text-[10px] sm:text-xs font-bold py-2 rounded-md transition-all ${
                            customerInfo.type === type 
                            ? 'bg-white text-stone-900 shadow-sm' 
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                      >
                          {type}
                      </button>
                  ))}
              </div>
           </div>

           {/* 2. DYNAMIC INPUTS */}
           <AnimatePresence mode='wait'>
             <motion.div 
               key={customerInfo.type}
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
             >
                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        placeholder="Customer Name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none transition-colors ${formErrors.name ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                    />
                </div>

                {customerInfo.type === 'Dine In' && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Table <span className="text-red-500">*</span></label>
                        <select 
                            value={customerInfo.table}
                            onChange={(e) => setCustomerInfo({...customerInfo, table: e.target.value})}
                            className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none cursor-pointer ${formErrors.table ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                        >
                            <option value="">Select Table</option>
                            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Table {n}</option>)}
                        </select>
                    </div>
                )}

                {(customerInfo.type === 'Takeaway' || customerInfo.type === 'Delivery') && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                            <Phone size={12} /> Phone <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="tel" 
                            placeholder="+351..."
                            value={customerInfo.phone || ''}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none transition-colors ${formErrors.phone ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                        />
                    </div>
                )}

                {customerInfo.type === 'Delivery' && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                            <MapPin size={12} /> Address <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                            placeholder="Full delivery address..."
                            rows={2}
                            value={customerInfo.address || ''}
                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                            className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none resize-none transition-colors ${formErrors.address ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                        />
                    </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[200px]">
           {cart.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-stone-400 opacity-50 py-10">
               <ChefHat size={48} strokeWidth={1} />
               <p className="mt-2 text-sm font-serif italic">Your cart is empty</p>
             </div>
           ) : (
             <AnimatePresence>
               {cart.map(item => (
                 <motion.div 
                   key={item.id}
                   layout
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex gap-4 items-center group"
                 >
                   <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-stone-100">
                     <img src={item.image || ''} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-sm text-stone-800 truncate">{item.name}</h4>
                     <p className="text-xs text-stone-500">€{item.price} each</p>
                     <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"><Minus size={10}/></button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"><Plus size={10}/></button>
                     </div>
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-stone-900 text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-300 hover:text-red-500 transition-colors p-1"><Trash2 size={14}/></button>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           )}
        </div>
        
        {/* Cart Footer / Totals */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 relative">
            {/* Success Overlay */}
           <AnimatePresence>
                {orderStatus === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.5 }} 
                            animate={{ scale: 1 }}
                            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
                        >
                            <CheckCircle2 size={32} />
                        </motion.div>
                        <h3 className="font-display font-bold text-xl text-stone-900 mb-2">Order Placed!</h3>
                        <p className="text-stone-500 text-sm">Your order has been sent to the kitchen.</p>
                    </motion.div>
                )}
           </AnimatePresence>

           {cart.length > 0 && (
              <div className="flex justify-end mb-4">
                 <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-bold"><Trash2 size={12}/> Clear Order</button>
              </div>
           )}

           <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tax (10%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-stone-900 border-t border-stone-200 pt-2 mt-2">
                <span>Grand Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
           </div>

           <Button 
             className="w-full !rounded-xl !py-4 flex justify-center items-center gap-2" 
             disabled={cart.length === 0 || orderStatus !== 'idle'}
             onClick={handlePlaceOrder}
           >
             {orderStatus === 'processing' ? (
                 <>Processing...</>
             ) : (
                 <>
                    Place {customerInfo.type} Order {getOrderTypeIcon()}
                 </>
             )}
           </Button>
        </div>

      </div>
    </div>
  );
};