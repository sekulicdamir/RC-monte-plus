import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle, Button, Card } from '../components/UIComponents';
import { MockDB } from '../services/db';
import { Lead } from '../types';
import { useLocation } from 'react-router-dom';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    location: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    const s = location.state?.service;
    return s ? [s] : [];
  });
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const lead: Omit<Lead, 'id' | 'date' | 'status'> = {
      ...formData,
      propertyLocation: formData.location,
      propertyTypes: selectedPropertyTypes,
      serviceTypes: selectedServices,
    };
    
    MockDB.addLead(lead);

    fetch("https://formspree.io/f/xqedkkwo", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: "New Request - MPS Website",
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            property_types: selectedPropertyTypes.join(', '),
            services: selectedServices.join(', '),
            message: formData.message
        })
    })
    .then(response => response.json())
    .then(data => console.log("Email sent successfully:", data))
    .catch(error => console.error("Email sending failed:", error))
    .finally(() => {
        setIsSending(false);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
          <Check size={48} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">{t('form.success.title')}</h2>
        <p className="text-lg sm:text-xl text-slate-500 max-w-lg mb-12">{t('form.success.message')}</p>
        <Button onClick={() => setSubmitted(false)}>{t('form.success.button')}</Button>
      </div>
    );
  }

  const serviceOptions = [
    { key: 'Housekeeping', label: t('form.service.housekeeping') },
    { key: 'Pool & Spa', label: t('form.service.pool') },
    { key: 'Maintenance', label: t('form.service.maintenance') },
    { key: 'Repairs', label: t('form.service.repairs') },
    { key: 'Concierge', label: t('form.service.concierge') },
    { key: 'Security', label: t('form.service.security') },
    { key: 'Boat', label: t('form.service.boat') },
    { key: 'Car', label: t('form.service.car') },
    { key: 'Garden', label: t('form.service.garden') },
    { key: 'Cleaning', label: t('form.service.cleaning') }
  ];

  const propertyTypes = [
    { key: 'Apartment', label: t('form.property_type.apartment') },
    { key: 'Villa', label: t('form.property_type.villa') },
    { key: 'House', label: t('form.property_type.house') },
    { key: 'Land', label: t('form.property_type.land') }
  ];

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-[1600px]">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />
        
        <div className="max-w-3xl mx-auto">
             <div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-lg font-bold text-slate-800 ml-1">{t('form.name')}</label>
                            <input 
                            required
                            type="text" 
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-lg md:text-xl placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                            placeholder={t('form.name')}
                            value={formData.fullName}
                            onChange={e => setFormData({...formData, fullName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-lg font-bold text-slate-800 ml-1">{t('form.email')}</label>
                            <input 
                            required
                            type="email" 
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-lg md:text-xl placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                            placeholder="name@email.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-lg font-bold text-slate-800 ml-1">{t('form.phone')}</label>
                            <input 
                            required
                            type="tel" 
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-lg md:text-xl placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                            placeholder={t('form.placeholder.phone')}
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-lg font-bold text-slate-800 ml-1">{t('form.location')}</label>
                            <input 
                            required
                            type="text" 
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-lg md:text-xl placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                            placeholder={t('form.placeholder.location')}
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-lg font-bold text-slate-800 ml-1">{t('form.property_type')}</label>
                        <div className="flex flex-wrap gap-3">
                            {propertyTypes.map(type => (
                            <button
                                key={type.key}
                                type="button"
                                onClick={() => togglePropertyType(type.key)}
                                className={`px-6 py-3 rounded-full text-base sm:text-lg font-bold transition-all border-2 ${
                                selectedPropertyTypes.includes(type.key) 
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-xl' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800'
                                }`}
                            >
                                {type.label}
                            </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label className="text-2xl font-bold text-slate-800 ml-1">{t('form.help_with')}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {serviceOptions.map(svc => (
                            <button
                                key={svc.key}
                                type="button"
                                onClick={() => toggleService(svc.key)}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
                                selectedServices.includes(svc.key) 
                                    ? 'bg-slate-900 border-slate-900 shadow-xl' 
                                    : 'bg-white border-slate-200 hover:border-cyan-500 hover:bg-slate-50'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                selectedServices.includes(svc.key)
                                    ? 'bg-cyan-500 border-cyan-500'
                                    : 'bg-white border-slate-300 group-hover:border-cyan-400'
                                }`}>
                                    {selectedServices.includes(svc.key) && <Check size={20} className="text-white" strokeWidth={4} />}
                                </div>
                                <span className={`text-lg sm:text-xl font-bold ${
                                selectedServices.includes(svc.key) ? 'text-white' : 'text-slate-700'
                                }`}>{svc.label}</span>
                            </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-lg font-bold text-slate-800 ml-1">{t('form.message')}</label>
                        <textarea 
                            rows={4}
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-lg md:text-xl placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none resize-none"
                            placeholder={t('form.placeholder.message')}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>

                    <Button type="submit" disabled={isSending} className="w-full text-xl py-6 bg-slate-900 hover:bg-slate-800 text-white shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSending ? t('form.sending') : t('form.submit')}
                    </Button>
                </form>
             </div>
        </div>
      </div>
    </div>
  );
};