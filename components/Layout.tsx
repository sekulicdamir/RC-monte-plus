import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, X, Briefcase, Phone, User, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setLanguage, language, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showLangSwitcher, setShowLangSwitcher] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowLangSwitcher(false);
        setIsLangOpen(false);
      } else {
        setShowLangSwitcher(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 relative">
      
      <div className={`fixed top-6 right-6 z-50 transition-all duration-500 ease-in-out ${showLangSwitcher ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <button 
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-lg border border-slate-200 rounded-full px-4 py-2 hover:bg-white transition-all hover:scale-105 active:scale-95 group"
        >
           <span className="text-xl leading-none">{currentLang.flag}</span>
           <span className="text-sm font-bold text-slate-700 uppercase hidden sm:inline-block">{currentLang.name}</span>
           <span className="text-sm font-bold text-slate-700 uppercase sm:hidden">{currentLang.code.split('-')[0]}</span>
           <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
        </button>

        {isLangOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
            <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 animate-fade-in-up z-50 max-h-[80vh] overflow-y-auto">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('lang.select')}</span>
                </div>
                {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 flex items-center gap-4 hover:bg-slate-50 transition-colors ${language === lang.code ? 'bg-cyan-50 text-cyan-900 font-bold' : 'text-slate-600'}`}
                    >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                        {language === lang.code && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-500"></div>}
                    </button>
                ))}
            </div>
          </>
        )}
      </div>

      <main className="flex-grow pb-28">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 h-[80px] px-4 md:px-12 flex justify-between md:justify-center md:gap-20 items-center">
        
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center gap-1.5 w-20 transition-all ${isActive('/') ? 'text-cyan-700 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home size={26} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className={`text-[11px] font-bold tracking-wider uppercase ${isActive('/') ? 'opacity-100' : 'opacity-70'}`}>{t('nav.home')}</span>
        </Link>

        <Link 
          to="/services" 
          className={`flex flex-col items-center justify-center gap-1.5 w-20 transition-all ${isActive('/services') ? 'text-cyan-700 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Briefcase size={26} strokeWidth={isActive('/services') ? 2.5 : 2} />
          <span className={`text-[11px] font-bold tracking-wider uppercase ${isActive('/services') ? 'opacity-100' : 'opacity-70'}`}>{t('nav.services')}</span>
        </Link>

        <Link 
          to="/contact" 
          className={`flex flex-col items-center justify-center gap-1.5 w-20 transition-all ${isActive('/contact') ? 'text-cyan-700 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Phone size={26} strokeWidth={isActive('/contact') ? 2.5 : 2} />
          <span className={`text-[11px] font-bold tracking-wider uppercase ${isActive('/contact') ? 'opacity-100' : 'opacity-70'}`}>{t('nav.contact')}</span>
        </Link>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className={`flex flex-col items-center justify-center gap-1.5 w-20 transition-all ${isMenuOpen ? 'text-cyan-700 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Menu size={26} strokeWidth={isMenuOpen ? 2.5 : 2} />
          <span className={`text-[11px] font-bold tracking-wider uppercase ${isMenuOpen ? 'opacity-100' : 'opacity-70'}`}>{t('nav.menu')}</span>
        </button>

      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className="bg-white w-full max-w-2xl mx-auto rounded-t-[2.5rem] shadow-2xl relative z-10 animate-fade-in-up max-h-[80vh] overflow-y-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-slate-900">{t('menu.title')}</h2>
                        <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-10">
                        <div className="grid grid-cols-2 gap-4">
                             <Link to="/about" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl hover:bg-cyan-50 hover:text-cyan-700 transition-colors gap-3 group">
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform"><User size={24} /></div>
                                <span className="font-bold">{t('menu.about')}</span>
                             </Link>
                             <Link to="/admin" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl hover:bg-cyan-50 hover:text-cyan-700 transition-colors gap-3 group">
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform"><User size={24} /></div>
                                <span className="font-bold">{t('menu.admin')}</span>
                             </Link>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50 text-center text-xs text-slate-400 rounded-b-none rounded-t-none">
                    Montenegro Property Services App v1.0
                </div>
            </div>
        </div>
      )}
    </div>
  );
};