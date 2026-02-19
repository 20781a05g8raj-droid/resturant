import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'dark';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative group px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 overflow-hidden shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed";
  
  // Define content for different variants
  const getVariantContent = () => {
    switch (variant) {
      case 'outline':
        return (
          <>
             {/* Background that appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c59d5f] via-[#d4af37] to-[#8e6c36] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_100%] animate-gradient-x"></div>
            <span className="relative z-10 transition-colors duration-300 text-gold-500 group-hover:text-white flex items-center justify-center gap-2">{children}</span>
             {/* Border */}
            <div className="absolute inset-0 border-2 border-gold-500 rounded-full group-hover:border-transparent transition-colors duration-300"></div>
          </>
        );
      case 'dark':
        return (
          <>
             <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 bg-[length:200%_100%] animate-gradient-x"></div>
             <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 w-1/2 skew-x-12"></div>
             <span className="relative z-10 text-white flex items-center justify-center gap-2">{children}</span>
          </>
        );
      case 'primary':
      default:
        return (
          <>
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c59d5f] via-[#d4af37] to-[#8e6c36] group-hover:from-stone-900 group-hover:via-stone-700 group-hover:to-stone-900 bg-[length:200%_100%] animate-gradient-x transition-all duration-500"></div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 w-1/2 skew-x-12"></div>
            
            {/* Content */}
            <span className="relative z-10 text-white flex items-center justify-center gap-2">{children}</span>
          </>
        );
    }
  };

  return (
    <button 
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {getVariantContent()}
    </button>
  );
};