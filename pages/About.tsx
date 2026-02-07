import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SectionTitle } from '../components/UIComponents';
import { useLanguage } from '../context/LanguageContext';
import { MockDB } from '../services/db';

export const About: React.FC = () => {
  const { language, t } = useLanguage();
  const config = MockDB.getConfig();

  return (
    <div className="py-24 bg-white w-full">
         <div className="container mx-auto px-6 md:px-12 max-w-[1600px]">
            <SectionTitle 
              title={config.aboutTitle[language] || config.aboutTitle['en']} 
              subtitle={config.aboutSubtitle[language] || config.aboutSubtitle['en']} 
            />

            <div className="max-w-4xl mx-auto space-y-16">
                 
                 <div className="prose prose-lg prose-slate mx-auto text-center mb-16">
                    <p className="text-2xl text-slate-600 leading-relaxed font-light">
                        {config.aboutContent[language] || config.aboutContent['en']}
                    </p>
                 </div>

                 {/* Contact Info Section */}
                 <div className="bg-slate-50 rounded-3xl p-10 md:p-16 border border-slate-100 shadow-sm">
                    <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">{t('about.contactInfo')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center text-center gap-4 text-slate-600 text-xl font-medium">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm text-cyan-700 flex items-center justify-center mb-2">
                                <Phone size={32} />
                            </div>
                            <span>{config.phoneNumber}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-4 text-slate-600 text-xl font-medium">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm text-cyan-700 flex items-center justify-center mb-2">
                                <Mail size={32} />
                            </div>
                            <span className="break-all text-lg">{config.contactEmail}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-4 text-slate-600 text-xl font-medium">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm text-cyan-700 flex items-center justify-center mb-2">
                                <MapPin size={32} />
                            </div>
                            <span>{config.address}</span>
                        </div>
                    </div>
                 </div>

            </div>
         </div>
    </div>
  );
};