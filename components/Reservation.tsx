import React, { useState } from 'react';
import { ReservationData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Check, AlertCircle } from 'lucide-react';

export const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: 'Dinner'
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showTermsError, setShowTermsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setShowTermsError(true);
      // Shake animation effect for terms
      const termsElement = document.getElementById('terms-section');
      if (termsElement) {
        termsElement.classList.add('animate-shake');
        setTimeout(() => termsElement.classList.remove('animate-shake'), 500);
      }
      return;
    }
    
    setShowTermsError(false);

    // Simulate API call
    setStatus('idle');
    setTimeout(() => {
      setStatus('success');
      setFormData({
         name: '',
         email: '',
         phone: '',
         date: '',
         time: '',
         guests: 2,
         occasion: 'Dinner'
      });
      setAcceptedTerms(false);
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section id="reservations" className="py-24 relative flex items-center justify-center min-h-screen bg-stone-900 overflow-hidden">
      {/* Background Image - Visible through glass */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
          alt="Restaurant Background" 
          className="w-full h-full object-cover" 
        />
        {/* Dark overlay for readability, but lighter to show image */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow Borders */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent"></div>

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Make your Booking</h2>
            <p className="text-stone-300 text-sm drop-shadow-md">Reserve your spot for an unforgettable dining experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-green-500/20 text-green-200 border border-green-500/30 rounded-2xl text-center mb-6 backdrop-blur-sm"
                >
                  <p className="font-bold">Reservation Request Sent!</p>
                  <p className="text-sm">We will confirm with you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Name</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white placeholder-stone-400 outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all backdrop-blur-sm"
                    placeholder="Enter your name"
                  />
                  <User size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-gold-500 transition-colors" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Email</label>
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white placeholder-stone-400 outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all backdrop-blur-sm"
                    placeholder="Enter your Email"
                  />
                  <Mail size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-gold-500 transition-colors" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Phone Number</label>
                <div className="relative group">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white placeholder-stone-400 outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all backdrop-blur-sm"
                    placeholder="+351 123 456 789"
                  />
                  <Phone size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-gold-500 transition-colors" />
                </div>
              </div>

              {/* Total People */}
              <div className="space-y-2">
                <label htmlFor="guests" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Total People</label>
                <div className="relative group">
                   <select 
                    id="guests" 
                    name="guests" 
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all appearance-none cursor-pointer backdrop-blur-sm"
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                      <option key={num} value={num} className="bg-stone-900 text-white">{num} Person{num > 1 ? 's' : ''}</option>
                    ))}
                    <option value="13+" className="bg-stone-900 text-white">13+ (Large Group)</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 group-focus-within:text-gold-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

               {/* Occasion/Package */}
               <div className="space-y-2">
                <label htmlFor="occasion" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Occasion / Seating</label>
                <div className="relative group">
                   <select 
                    id="occasion" 
                    name="occasion" 
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all appearance-none cursor-pointer backdrop-blur-sm"
                  >
                    <option value="Dinner" className="bg-stone-900">Standard Dinner</option>
                    <option value="Birthday" className="bg-stone-900">Birthday Celebration</option>
                    <option value="Anniversary" className="bg-stone-900">Anniversary</option>
                    <option value="Business" className="bg-stone-900">Business Meal</option>
                    <option value="Date" className="bg-stone-900">Romantic Date</option>
                    <option value="Private" className="bg-stone-900">Private Room</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 group-focus-within:text-gold-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

               {/* Time (Changed from Select to Input type="time") */}
               <div className="space-y-2">
                <label htmlFor="time" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Time</label>
                <div className="relative group">
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all [color-scheme:dark] backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="date" className="text-stone-200 text-sm font-medium ml-1 shadow-black drop-shadow-md">Reservation Date</label>
                <div className="relative group">
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-600 rounded-full px-6 py-3 text-white placeholder-stone-400 outline-none focus:border-gold-500 focus:bg-stone-900/80 transition-all [color-scheme:dark] backdrop-blur-sm"
                  />
                </div>
              </div>

            </div>

            {/* Checkbox */}
            <div id="terms-section" className="flex flex-col items-start space-y-2 mt-4 ml-1 transition-transform">
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={() => {
                    setAcceptedTerms(!acceptedTerms);
                    setShowTermsError(false);
                  }}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                    acceptedTerms ? 'bg-gold-500 border-gold-500 scale-110' : 
                    showTermsError ? 'bg-red-900/30 border-red-500' : 'bg-transparent border-stone-500'
                  }`}
                >
                  {acceptedTerms && <Check size={12} className="text-black font-bold" />}
                </button>
                <span 
                  className={`text-sm cursor-pointer drop-shadow-md transition-colors ${showTermsError ? 'text-red-400' : 'text-stone-300'}`} 
                  onClick={() => {
                    setAcceptedTerms(!acceptedTerms);
                    setShowTermsError(false);
                  }}
                >
                  I accept all <a href="#" className="text-white hover:underline hover:text-gold-400">terms and conditions</a>.
                </span>
              </div>
              {showTermsError && (
                 <motion.p 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-red-400 text-xs flex items-center gap-1 ml-8"
                 >
                   <AlertCircle size={12} /> Please accept terms to proceed
                 </motion.p>
              )}
            </div>

            {/* Luxury Colorful Button */}
            <div className="mt-8 flex justify-center">
              <button 
                type="submit" 
                className={`
                  group relative w-full md:w-auto px-16 py-5 rounded-full 
                  font-display font-bold uppercase tracking-[0.2em] text-sm text-white
                  shadow-[0_0_20px_rgba(212,175,55,0.3)] 
                  hover:shadow-[0_0_40px_rgba(196,30,58,0.6)] 
                  transform hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300
                  overflow-hidden
                `}
              >
                {/* Animated Gradient Background - Luxury Thai Silk Colors */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-brand-red via-gold-600 to-purple-900 bg-[length:300%_100%] animate-[gradientX_4s_ease-in-out_infinite] group-hover:animate-[gradientX_2s_ease-in-out_infinite]"></div>
                
                {/* Glassy Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                
                {/* Diagonal Shine Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 w-1/2 skew-x-12"></div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 border border-white/30 rounded-full z-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <span className="relative z-30 drop-shadow-md flex items-center justify-center gap-3">
                   Book Now
                </span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        @keyframes gradientX {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </section>
  );
};