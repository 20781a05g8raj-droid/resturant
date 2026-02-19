import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-black text-stone-400 py-16 border-t-2 border-gold-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="mb-8 md:mb-0">
             <div className="mb-6">
                <h3 className="font-display text-2xl text-white tracking-widest leading-none">NOSSO</h3>
                <div className="flex gap-2 text-sm mt-1 font-bold">
                    <span className="text-gold-500">SUSHI</span>
                    <span className="text-brand-red font-script">&</span>
                    <span className="text-stone-300">THAI</span>
                </div>
            </div>
            <p className="mb-6 leading-relaxed text-sm text-stone-500">
              The premier destination for Asian cuisine in Montijo. Experience the fusion of tradition and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-display font-bold uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gold-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <span>Rua da Gastronomia 123,<br />2870 Montijo, Portugal</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gold-500 mr-3 flex-shrink-0" size={18} />
                <span>+351 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-gold-500 mr-3 flex-shrink-0" size={18} />
                <span>reservas@nossoptdemo.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white text-lg font-display font-bold uppercase tracking-wider mb-6">Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-stone-800 pb-2">
                <span>Lunch (Tue-Sun)</span>
                <span className="text-gold-100">12:00 - 15:00</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-2">
                <span>Dinner (Tue-Sun)</span>
                <span className="text-gold-100">19:00 - 23:00</span>
              </li>
              <li className="flex justify-between pt-1">
                <span className="text-brand-red">Monday</span>
                <span className="text-stone-500">Closed</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-display font-bold uppercase tracking-wider mb-6">Updates</h4>
            <p className="mb-4 text-xs text-stone-500">Join our mailing list for special events.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-stone-900 border border-stone-800 p-3 text-white outline-none focus:border-gold-500 w-full text-sm rounded-sm"
              />
              <Button type="submit" className="!w-full !px-4 !py-2 text-xs">
                Join
              </Button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
          <p>&copy; {new Date().getFullYear()} Nosso Sushi & Thai. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-400">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};