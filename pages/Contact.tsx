import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Navigation, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { createContact } from '../lib/api/contactsApi';
import { DrawIcon, AnimatedDivider } from '../components/SvgAnimations';

export const Contact: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        const form = formRef.current;
        if (!form) return;
        const fd = new FormData(form);
        try {
            await createContact({
                name: (fd.get('name') as string) || '',
                email: (fd.get('email') as string) || '',
                phone: (fd.get('phone') as string) || null,
                subject: (fd.get('subject') as string) || 'General Inquiry',
                message: (fd.get('message') as string) || '',
            });
        } catch (err) {
            console.error('Contact submit error:', err);
        }
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 min-h-screen bg-[#faf7f2]"
        >
            {/* Hero Section */}
            <div className="bg-stone-900 py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/80 to-[#faf7f2]"></div>
                <div className="relative z-10 px-4 mt-10">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold-500 font-script text-3xl md:text-5xl mb-4 block drop-shadow-lg">Get in Touch</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-2xl tracking-wide">Contact Us</h1>
                        <p className="mt-6 text-stone-300 text-lg max-w-2xl mx-auto font-sans">
                            We are here to assist you with reservations, private dining inquiries, or any special requests.
                        </p>
                    </motion.div>
                </div>
            </div>

            <AnimatedDivider />

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Left Column: Form (Elevated) */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-gold-500 relative"
                    >
                        <div className="mb-10">
                            <span className="text-gold-600 font-bold tracking-widest text-xs uppercase mb-2 block">Direct Message</span>
                            <h2 className="text-3xl font-display font-bold text-stone-900">Send us a Message</h2>
                        </div>

                        {formStatus === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-sm p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-inner">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                                <p className="text-stone-600 mb-8">Thank you for contacting us. We will get back to you shortly.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="text-sm font-bold text-gold-600 hover:text-gold-700 underline uppercase tracking-wider"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            required
                                            className="peer w-full bg-transparent border-b border-stone-300 py-3 text-stone-800 outline-none focus:border-gold-500 transition-all placeholder-transparent"
                                            placeholder="Name"
                                            id="name"
                                            name="name"
                                        />
                                        <label htmlFor="name" className="absolute left-0 -top-3.5 text-stone-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-600 peer-focus:text-xs">Your Name</label>
                                    </div>
                                    <div className="group relative">
                                        <input
                                            type="tel"
                                            className="peer w-full bg-transparent border-b border-stone-300 py-3 text-stone-800 outline-none focus:border-gold-500 transition-all placeholder-transparent"
                                            placeholder="Phone"
                                            id="phone"
                                            name="phone"
                                        />
                                        <label htmlFor="phone" className="absolute left-0 -top-3.5 text-stone-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-600 peer-focus:text-xs">Phone (Optional)</label>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <input
                                        type="email"
                                        required
                                        className="peer w-full bg-transparent border-b border-stone-300 py-3 text-stone-800 outline-none focus:border-gold-500 transition-all placeholder-transparent"
                                        placeholder="Email"
                                        id="email"
                                    />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-stone-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-600 peer-focus:text-xs">Email Address</label>
                                </div>

                                <div className="group relative">
                                    <select name="subject" className="w-full bg-transparent border-b border-stone-300 py-3 text-stone-800 outline-none focus:border-gold-500 transition-all cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Private Dining</option>
                                        <option>Feedback</option>
                                        <option>Careers</option>
                                    </select>
                                    <label className="absolute left-0 -top-3.5 text-stone-500 text-xs">Subject</label>
                                </div>

                                <div className="group relative">
                                    <textarea
                                        required
                                        rows={4}
                                        className="peer w-full bg-transparent border-b border-stone-300 py-3 text-stone-800 outline-none focus:border-gold-500 transition-all resize-none placeholder-transparent"
                                        placeholder="Message"
                                        id="message"
                                        name="message"
                                    ></textarea>
                                    <label htmlFor="message" className="absolute left-0 -top-3.5 text-stone-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-600 peer-focus:text-xs">Message</label>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full justify-center" disabled={formStatus === 'submitting'}>
                                        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </form>
                        )}
                    </motion.div>

                    {/* Right Column: Info & Details */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col justify-center space-y-8 pt-10 lg:pt-0"
                    >
                        {/* Quick Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 shadow-lg border-l-4 border-stone-200 hover:border-gold-500 transition-all group">
                                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 mb-4 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                                    <DrawIcon delay={0.6}><Phone size={20} /></DrawIcon>
                                </div>
                                <h3 className="font-serif font-bold text-lg text-stone-800">Phone</h3>
                                <p className="text-stone-500 text-sm mt-1">+351 123 456 789</p>
                            </div>
                            <div className="bg-white p-6 shadow-lg border-l-4 border-stone-200 hover:border-gold-500 transition-all group">
                                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 mb-4 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                                    <DrawIcon delay={0.8}><Mail size={20} /></DrawIcon>
                                </div>
                                <h3 className="font-serif font-bold text-lg text-stone-800">Email</h3>
                                <p className="text-stone-500 text-sm mt-1">reservas@nosso.com</p>
                            </div>
                        </div>

                        <div className="bg-stone-900 text-white p-8 shadow-2xl relative overflow-hidden rounded-sm group mt-6">
                            <div className="absolute top-0 right-0 p-12 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                                <DrawIcon delay={1}><Clock size={140} /></DrawIcon>
                            </div>
                            <h3 className="font-display font-bold text-2xl mb-6 relative z-10 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gold-500"></span> Opening Hours
                            </h3>
                            <ul className="space-y-4 relative z-10 text-stone-300">
                                <li className="flex justify-between border-b border-stone-800 pb-3">
                                    <span className="font-serif">Tuesday - Sunday (Lunch)</span>
                                    <span className="text-gold-400 font-bold tracking-widest">12:00 - 15:00</span>
                                </li>
                                <li className="flex justify-between border-b border-stone-800 pb-3">
                                    <span className="font-serif">Tuesday - Sunday (Dinner)</span>
                                    <span className="text-gold-400 font-bold tracking-widest">19:00 - 23:00</span>
                                </li>
                                <li className="flex justify-between pt-2">
                                    <span className="text-brand-red font-bold font-serif">Monday</span>
                                    <span className="tracking-widest opacity-70">Closed</span>
                                </li>
                            </ul>
                        </div>

                        {/* Social Proof / Extra Text */}
                        <div className="bg-gold-50 p-6 border border-gold-100 rounded-sm">
                            <p className="text-stone-600 italic font-serif text-center">
                                "A dining experience that transcends the ordinary. We look forward to welcoming you."
                            </p>
                        </div>

                    </motion.div>

                </div>
            </div>

            {/* Map Section - WOW Factor */}
            <div className="relative h-[600px] w-full bg-stone-900 overflow-hidden border-t-8 border-gold-600 group">
                {/* Map Image (Dark Theme) */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')` }}
                ></div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">

                    {/* Pulsing Pin */}
                    <div className="relative mb-8">
                        <div className="absolute -inset-4 bg-gold-500/30 rounded-full animate-ping"></div>
                        <div className="absolute -inset-8 bg-gold-500/10 rounded-full animate-pulse"></div>
                        <div className="relative z-10 bg-gold-500 text-stone-900 p-4 rounded-full shadow-[0_0_30px_rgba(197,157,95,0.6)]">
                            <DrawIcon delay={0.2}><MapPin size={40} className="stroke-stone-900" /></DrawIcon>
                        </div>
                    </div>

                    {/* Glass Card */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-black/60 backdrop-blur-xl border border-white/10 p-10 text-center max-w-lg w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    >
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Find Us</h3>
                        <p className="text-stone-300 font-sans tracking-wide text-lg mb-6">Montijo, Portugal</p>

                        <div className="space-y-2 mb-8">
                            <p className="text-xl text-white font-serif">Rua da Gastronomia 123</p>
                            <p className="text-stone-400">2870 Montijo</p>
                        </div>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Montijo,+Portugal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-lg"
                        >
                            <Navigation size={18} /> Get Directions
                        </a>
                    </motion.div>

                </div>
            </div>

        </motion.div>
    );
};