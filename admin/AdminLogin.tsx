import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    if (isAuthenticated) {
        window.location.hash = '#/admin';
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const { error: err } = await login(email, password);
        if (err) {
            setError(err);
            setLoading(false);
        } else {
            window.location.hash = '#/admin';
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c59d5f_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Gradient blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl text-white tracking-widest">NOSSO</h1>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="font-display text-xl text-gold-500 tracking-wider">SUSHI</span>
                        <span className="font-script text-2xl text-brand-red">&</span>
                        <span className="font-display text-xl text-white tracking-wider">THAI</span>
                    </div>
                    <p className="text-stone-500 text-xs tracking-[0.3em] uppercase mt-3">Admin Panel</p>
                </div>

                {/* Card */}
                <div className="bg-stone-800/60 backdrop-blur-md border border-stone-700 rounded-lg p-8 shadow-2xl">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                            <Lock className="text-gold-500" size={18} />
                        </div>
                        <h2 className="text-white font-display text-lg tracking-wider">SIGN IN</h2>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-4 text-sm"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@nosso.com"
                                    required
                                    className="w-full bg-stone-900/50 border border-stone-600 pl-10 pr-4 py-3 text-white rounded focus:border-gold-500 focus:outline-none transition-colors placeholder-stone-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-stone-900/50 border border-stone-600 pl-10 pr-10 py-3 text-white rounded focus:border-gold-500 focus:outline-none transition-colors placeholder-stone-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 text-white font-display uppercase tracking-widest text-sm rounded hover:from-gold-600 hover:via-gold-400 hover:to-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-gold-500/20"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-stone-600 text-xs mt-6">
                    © {new Date().getFullYear()} Nosso Sushi & Thai — Admin Access Only
                </p>
            </motion.div>
        </div>
    );
};
