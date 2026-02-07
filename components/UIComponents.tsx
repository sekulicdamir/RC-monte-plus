import React from 'react';
import * as Icons from 'lucide-react';

export const SectionTitle: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">{title}</h2>
    {subtitle && <p className="text-slate-600 max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed font-normal">{subtitle}</p>}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-2xl hover:border-cyan-600/30 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export const DynamicIcon: React.FC<{ name: string; className?: string; size?: number }> = ({ name, className, size = 32 }) => {
  const Icon = (Icons as any)[name] || Icons.HelpCircle;
  return <Icon className={className} size={size} />;
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }> = ({ 
  children, variant = 'primary', className = '', ...props 
}) => {
  const baseClass = "px-10 py-5 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-3 active:scale-95 text-lg md:text-xl tracking-wide";
  const variants = {
    primary: "bg-cyan-700 text-white hover:bg-cyan-800 shadow-xl shadow-cyan-900/10 hover:shadow-2xl",
    outline: "border-3 border-slate-200 text-slate-700 hover:border-cyan-700 hover:text-cyan-800 bg-transparent",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  };
  
  return (
    <button className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};