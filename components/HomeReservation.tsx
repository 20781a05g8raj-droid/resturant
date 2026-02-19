import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronDown, Phone, Check, AlertCircle } from 'lucide-react';

export const HomeReservation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    occasion: 'Dinner'
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        occasion: 'Dinner'
      });
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="reservations" className="py-20 bg-[#f4efe9] relative border-t border-stone-200">
       {/* Background graphic elements */}
       <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
           <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor">
               <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 90 C30 90 10 70 10 50 C10 30 30 10 50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 Z" />
           </svg>
       </div>

      <style>{`
        /* Hide native pickers but keep functionality so we can use custom icons */
        .custom-date-input::-webkit-calendar-picker-indicator,
        .custom-time-input::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
        }
        @keyframes gradientX {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
        }
        @keyframes shimmer {
            100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-12 bg-[#d4af37] opacity-50"></div>
                <div className="text-[#d4af37] opacity-70">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C5 5 5 0 10 0C15 0 15 5 20 5C15 5 15 10 10 10C5 10 5 5 0 5Z" fill="currentColor"/>
                    </svg>
                </div>
                <h2 className="text-5xl md:text-6xl font-script text-stone-900 px-4">Reservations</h2>
                <div className="text-[#d4af37] opacity-70">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C5 5 5 0 10 0C15 0 15 5 20 5C15 5 15 10 10 10C5 10 5 5 0 5Z" fill="currentColor"/>
                    </svg>
                </div>
                <div className="h-[1px] w-12 bg-[#d4af37] opacity-50"></div>
            </div>
            <p className="text-stone-600 font-sans text-sm tracking-widest font-bold">Book Your Table</p>
        </div>

        {/* Success Message */}
        <AnimatePresence>
            {status === 'success' && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-2xl mx-auto mb-8 p-4 bg-green-100 text-green-800 border border-green-200 rounded-sm text-center"
            >
                <div className="flex items-center justify-center gap-2">
                    <Check size={18} />
                    <p className="font-bold">Table Requested Successfully!</p>
                </div>
                <p className="text-sm mt-1">We will contact you shortly to confirm.</p>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
                
                {/* Row 1: Personal Info */}
                <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name" 
                    className="flex-1 min-w-[200px] md:max-w-[240px] bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 placeholder-stone-400 outline-none focus:border-[#c59d5f] rounded-sm transition-colors"
                />
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email" 
                    className="flex-1 min-w-[200px] md:max-w-[240px] bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 placeholder-stone-400 outline-none focus:border-[#c59d5f] rounded-sm transition-colors"
                />
                <div className="relative flex-1 min-w-[200px] md:max-w-[240px]">
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone" 
                        className="w-full bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 placeholder-stone-400 outline-none focus:border-[#c59d5f] rounded-sm transition-colors"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                </div>
                 <div className="relative flex-1 min-w-[200px] md:max-w-[240px]">
                    <select 
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        className="w-full bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 outline-none focus:border-[#c59d5f] rounded-sm cursor-pointer appearance-none transition-colors"
                    >
                        <option value="Dinner">Dinner</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Business">Business</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                </div>

                {/* Row 2: Date/Time */}
                <div className="relative flex-1 min-w-[200px] md:max-w-[240px]">
                    <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="custom-date-input w-full bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 outline-none focus:border-[#c59d5f] rounded-sm uppercase text-sm transition-colors"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                </div>

                <div className="relative flex-1 min-w-[200px] md:max-w-[240px]">
                    <input 
                        type="time" 
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="custom-time-input w-full bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 outline-none focus:border-[#c59d5f] rounded-sm transition-colors"
                    />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                </div>

                <div className="relative flex-1 min-w-[200px] md:max-w-[240px]">
                    <select 
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#faf7f2] border border-stone-300 px-4 py-3 text-stone-700 outline-none focus:border-[#c59d5f] rounded-sm cursor-pointer appearance-none transition-colors"
                    >
                        <option value="">Party Size</option>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
                        <option value="9+">Large Group</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="mt-8 text-center flex justify-center">
                <button 
                    type="submit"
                    disabled={status === 'success'}
                    className={`
                        group relative px-10 py-4 md:px-12 md:py-4 rounded-full 
                        font-display font-bold uppercase tracking-widest text-xs md:text-sm text-white
                        shadow-xl hover:shadow-2xl
                        transform hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300
                        overflow-hidden
                        disabled:opacity-70 disabled:cursor-not-allowed
                        w-auto min-w-[180px]
                    `}
                >
                     {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c59d5f] via-[#d4af37] to-[#8e6c36] group-hover:from-stone-900 group-hover:via-stone-700 group-hover:to-stone-900 bg-[length:200%_100%] animate-[gradientX_3s_ease-in-out_infinite] transition-all duration-500"></div>
                    
                    {/* Diagonal Shine Sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 w-1/2 skew-x-12"></div>

                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'success' ? (
                            <>
                                <Check size={16} /> Request Sent
                            </>
                        ) : 'Book Now'}
                    </span>
                </button>
            </div>
        </form>

      </div>
    </section>
  );
};