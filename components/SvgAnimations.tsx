import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Loading Screen Animation ---
// A luxurious, slow-drawing minimal SVG (like a stylized lotus or abstract wave)
export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    useEffect(() => {
        // Hold the loading screen for a minimum duration to allow the animation to play
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6">
                <motion.svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-[0_0_15px_rgba(197,157,95,0.3)]"
                    fill="none"
                    stroke="#c59d5f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Abstract Lotus / Wave Pattern */}
                    <motion.path
                        d="M50 90 Q30 90 20 70 Q10 50 30 30 Q50 10 70 30 Q90 50 80 70 Q70 90 50 90 Z"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M50 90 Q40 60 50 30 Q60 60 50 90 Z"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                    />
                    <motion.path
                        d="M30 70 Q50 50 70 70"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                    />
                </motion.svg>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex items-center gap-2"
            >
                <span className="font-display tracking-[0.2em] text-gold-500 uppercase text-sm md:text-base">
                    Nosso Sushi
                </span>
                <span className="font-script text-brand-red text-xl leading-none">&</span>
                <span className="font-display tracking-[0.2em] text-white uppercase text-sm md:text-base">
                    Thai
                </span>
            </motion.div>
        </motion.div>
    );
};

// --- Hero Luxury Background ---
// Floating, subtle SVG geometric patterns for the background
export const LuxuryBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20 MixBlendMode-screen">
            <motion.svg
                className="absolute -top-20 -left-20 w-[40rem] h-[40rem] text-gold-500/10 mix-blend-screen"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    rotate: [0, 90, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
                <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </motion.svg>

            <motion.svg
                className="absolute -bottom-40 -right-20 w-[50rem] h-[50rem] text-brand-red/10 mix-blend-screen"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    rotate: [0, -90, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
                <path d="M20 100 Q 100 20 180 100 Q 100 180 20 100" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.05" />
            </motion.svg>
        </div>
    );
};

// --- Animated Section Divider ---
// Elegant wave/curve to transition between sections instead of straight lines
export const AnimatedDivider: React.FC<{ inverted?: boolean }> = ({ inverted = false }) => {
    return (
        <div className={`w-full overflow-hidden leading-none ${inverted ? 'transform rotate-180' : ''}`}>
            <motion.svg
                className="relative block w-full h-[50px] md:h-[100px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    fill="currentColor"
                    className="text-stone-900"
                ></path>
                <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    fill="currentColor"
                    className="text-gold-500/10"
                ></path>
            </motion.svg>
        </div>
    );
};

// --- Draw Icon Animation ---
// A wrapper for SVG icons to give them a draw-in effect when scrolled into view
export const DrawIcon: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                        pathLength: { duration: 1.5, ease: "easeInOut", delay },
                        opacity: { duration: 0.5, delay }
                    }
                }
            }}
        >
            {/* We apply the animation via variants to the child SVG paths */}
            <style>{`
        .draw-icon-active path, .draw-icon-active circle, .draw-icon-active rect, .draw-icon-active line, .draw-icon-active polyline, .draw-icon-active polygon {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw-in 1.5s ease-in-out forwards;
          animation-delay: ${delay}s;
        }
        @keyframes draw-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
            <div className="draw-icon-active">
                {children}
            </div>
        </motion.div>
    );
};
