import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Smartphone, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle, Card, DynamicIcon, Button } from '../components/UIComponents';
import { MockDB } from '../services/db';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const services = MockDB.getServices();
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const regions = [
    {
      id: 'coast',
      title: t('home.locations.coast_title'),
      description: t('home.locations.coast_desc'),
      cities: ['Herceg Novi', 'Igalo', 'Tivat', 'Kotor', 'Perast', 'Risan', 'Meljine', 'Zelenika', 'Kumbor', 'Đenovići', 'Baošići', 'Bijela', 'Kamenari', 'Kostanjica', 'Morinj', 'Budva', 'Miločer', 'Sveti Stefan', 'Bečići', 'Petrovac', 'Sutomore', 'Bar', 'Ulcinj'],
    },
    {
      id: 'north',
      title: t('home.locations.north_title'),
      description: t('home.locations.north_desc'),
      cities: ['Podgorica', 'Cetinje', 'Nikšić', 'Danilovgrad', 'Tuzi', 'Golubovci', 'Kolašin', 'Mojkovac', 'Bijelo Polje', 'Berane', 'Andrijevica', 'Plav', 'Gusinje', 'Rožaje', 'Pljevlja', 'Žabljak', 'Šavnik', 'Plužine'],
    }
  ];

  const toggleRegion = (id: string) => {
    setOpenRegion(openRegion === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-0 bg-slate-50 w-full overflow-x-hidden">
      <section className="relative min-h-[90vh] flex items-center justify-center py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.blueroadstouring.com/sites/default/files/styles/hero_slide_large/public/2025-06/brt-web-destination-montenegro-hero-slider-desktop.jpg.webp?itok=oy8lUTIE" 
            alt="Montenegro Coast" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-cyan-900/50 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-[1600px]">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-full text-sm sm:text-base font-bold mb-8 animate-fade-in-up uppercase tracking-widest shadow-sm">
              {t('hero.tagline')}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 leading-[1.05] tracking-tighter drop-shadow-xl">
              {t('hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-100 mb-16 leading-relaxed max-w-4xl mx-auto font-light drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <Link to="/contact" className="w-full">
                <Button className="w-full text-lg sm:text-xl py-5 sm:py-6 bg-cyan-600 text-white hover:bg-cyan-500 shadow-2xl shadow-cyan-900/30 border-0">
                  {t('hero.cta.quote')}
                </Button>
              </Link>
              <Link to="/services" className="w-full">
                <Button variant="outline" className="w-full text-lg sm:text-xl py-5 sm:py-6 bg-white text-slate-900 border-white hover:bg-slate-100 hover:text-slate-900 hover:border-white">
                  {t('hero.cta.services')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 max-w-[1600px] text-center">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-10 tracking-tight">{t('home.vision.title')}</h2>
                <p className="text-slate-600 text-xl sm:text-2xl md:text-3xl leading-relaxed mb-12 font-light">
                    {t('home.vision.subtitle')}
                </p>
                <div className="bg-slate-900 rounded-3xl p-8 md:px-16 md:py-10 inline-block shadow-2xl">
                    <ul className="flex flex-col md:flex-row gap-6 md:gap-16 text-left items-start">
                        <li className="flex items-center gap-4 text-white text-base md:text-xl font-bold uppercase tracking-widest">
                            <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] shrink-0"></span>
                            {t('home.vision.tag1')}
                        </li>
                        <li className="flex items-center gap-4 text-white text-base md:text-xl font-bold uppercase tracking-widest">
                             <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] shrink-0"></span>
                             {t('home.vision.tag2')}
                        </li>
                        <li className="flex items-center gap-4 text-white text-base md:text-xl font-bold uppercase tracking-widest">
                             <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] shrink-0"></span>
                             {t('home.vision.tag3')}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 py-12 bg-slate-50">
        <div className="max-w-[1800px] mx-auto">
          <SectionTitle title={t('home.services.title')} subtitle={t('home.services.subtitle')} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.slice(0, 4).map(s => (
              <Link to={`/services#service-${s.id}`} key={s.id} className="group">
                <Card className="h-full p-10 flex flex-col items-center justify-center text-center bg-white hover:border-cyan-500 transition-all duration-300 shadow-md hover:shadow-2xl">
                  <div className="w-24 h-24 rounded-full bg-cyan-700 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:bg-slate-50 group-hover:text-cyan-700 transition-all duration-300 border-2 border-cyan-700 group-hover:border-slate-100 shadow-lg group-hover:shadow-none">
                    <DynamicIcon name={s.icon} size={48} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-cyan-800 transition-colors leading-tight px-2 mb-4">{s.title[language] || s.title['en']}</h3>
                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 text-cyan-600">
                      <ArrowRight size={32} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pt-12 pb-32 border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
            <SectionTitle title={t('home.locations.title')} subtitle={t('home.locations.subtitle')} />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {regions.map((region) => (
                  <div key={region.id} className="border-2 border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <button 
                      onClick={() => toggleRegion(region.id)}
                      className={`w-full flex items-center justify-between p-8 md:p-12 text-left transition-colors cursor-pointer ${
                        openRegion === region.id ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 border-2 shadow-lg ${
                          openRegion === region.id ? 'bg-white text-cyan-700 border-slate-100 scale-110 shadow-none' : 'bg-cyan-700 text-white border-cyan-700'
                        }`}>
                          <MapPin size={32} />
                        </div>
                        <div>
                           <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{region.title}</h3>
                           <p className="text-base sm:text-lg text-slate-500 font-medium md:hidden">{t('home.locations.tap_details')}</p>
                        </div>
                      </div>
                      <div className={`p-4 rounded-full text-slate-400 hidden md:block ${openRegion === region.id ? 'bg-white shadow-sm text-slate-600' : ''}`}>
                         {openRegion === region.id ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                      </div>
                    </button>
                    
                    {openRegion === region.id && (
                      <div className="p-8 md:p-12 pt-0 bg-slate-50 border-t border-slate-200 animate-fade-in-up">
                         <p className="text-slate-600 text-lg sm:text-xl md:text-2xl mb-10 leading-relaxed max-w-4xl font-medium">
                            {region.description}
                         </p>
                         <div>
                            <h4 className="text-base font-bold text-slate-400 uppercase tracking-widest mb-6">{t('home.locations.covered_locations')}</h4>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-6">
                                {region.cities.map(city => (
                                    <li key={city} className="flex items-center gap-3 text-slate-700 text-base sm:text-lg md:text-xl font-medium">
                                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#107490]"></div>
                                      {city}
                                    </li>
                                ))}
                            </ul>
                         </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
        </div>
      </section>

      <section className="bg-cyan-700 py-32 text-center">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-10">{t('home.cta.title')}</h2>
            <p className="text-cyan-50 text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto mb-16 font-light leading-relaxed">
                {t('home.cta.subtitle')}
            </p>
            <Link to="/contact">
                <button className="bg-white text-slate-900 px-12 sm:px-16 py-6 sm:py-8 rounded-full font-black text-xl sm:text-2xl hover:bg-slate-100 shadow-2xl transition-all hover:scale-105">
                    {t('home.cta.button')}
                </button>
            </Link>
        </div>
      </section>
    </div>
  );
};