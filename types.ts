export type LanguageCode = 
  | 'sr' | 'hr' | 'me' | 'en' | 'ru' | 'de' | 'uk' | 'tr' | 'es' | 'zh-HK' | 'zh-CN' | 'ja' | 'hi';

export interface Service {
  id: string;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  details: Record<LanguageCode, string[]>; // Added for bullet points
  icon: string;
  category: 'maintenance' | 'assets' | 'security' | 'lifestyle';
}

export interface BlogPost {
  id: string;
  title: Record<LanguageCode, string>;
  content: Record<LanguageCode, string>;
  date: string;
  image: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  propertyLocation: string;
  propertyTypes: string[];
  serviceTypes: string[];
  status: 'new' | 'contacted' | 'closed';
  date: string;
}

export interface SiteConfig {
  primaryColor: string;
  accentColor: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  aboutTitle: Record<LanguageCode, string>;
  aboutSubtitle: Record<LanguageCode, string>;
  aboutContent: Record<LanguageCode, string>;
}

export interface TranslationDictionary {
  [key: string]: Record<LanguageCode, string>;
}