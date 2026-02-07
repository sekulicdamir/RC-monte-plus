import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle, Card, DynamicIcon, Button } from '../components/UIComponents';
import { MockDB } from '../services/db';
import { Link, useLocation } from 'react-router-dom';

export const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const services = MockDB.getServices();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [hash]);

  const getContactServiceKey = (titleEn: string) => {
    if (titleEn.includes('Housekeeping')) return 'Housekeeping';
    if (titleEn.includes('Pool')) return 'Pool & Spa';
    if (titleEn.includes('Technical')) return 'Maintenance';
    if (titleEn.includes('Exterior')) return 'Garden';
    if (titleEn.includes('Security')) return 'Security';
    if (titleEn.includes('Boat')) return 'Boat';
    if (titleEn.includes('Car')) return 'Car';
    if (titleEn.includes('Concierge')) return 'Concierge';
    if (titleEn.includes('Emergency')) return 'Repairs';
    return 'Maintenance';
  };

  const categoryOrder = ['maintenance', 'security', 'assets', 'lifestyle'];

  return (
    <div className="py-24 bg-slate-50 w-full overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[1800px]">
        <SectionTitle title={t('nav.services')} subtitle={t('services.subtitle')} />
        
        {categoryOrder.map(cat => (
          <div key={cat} className="mb-32 last:mb-0">
            <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest mb-12 flex items-center gap-6">
                {cat}
                <span className="h-1 bg-slate-200 flex-grow rounded-full"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-12">
              {services.filter(s => s.category === cat).map(s => (
                <div key={s.id} id={`service-${s.id}`} className="h-full">
                  <Card className="flex flex-col h-full bg-white border-slate-100 hover:border-cyan-500 hover:shadow-2xl transition-all p-10 group">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-24 h-24 rounded-full bg-cyan-700 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-slate-50 group-hover:text-cyan-700 transition-all duration-300 border-2 border-cyan-700 group-hover:border-slate-100 shadow-lg group-hover:shadow-none">
                          <DynamicIcon name={s.icon} size={48} />
                      </div>
                    </div>
                    
                    <h4 className="text-3xl font-bold mb-6 text-slate-900 tracking-tight">{s.title[language] || s.title['en']}</h4>
                    <p className="text-slate-600 mb-8 italic text-xl leading-relaxed">
                      {s.description[language] || s.description['en']}
                    </p>
                    
                    <ul className="space-y-4 mb-10 flex-grow">
                        {s.details && (s.details[language] || s.details['en']).map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg font-medium">
                                <div className="mt-2 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-cyan-500 transition-colors flex-shrink-0"></div>
                                {detail}
                            </li>
                        ))}
                    </ul>

                    <Link to="/contact" state={{ service: getContactServiceKey(s.title['en']) }}>
                        <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:border-cyan-700 hover:text-cyan-800 text-lg py-4 hover:bg-cyan-50">{t('services.quote_btn')}</Button>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};