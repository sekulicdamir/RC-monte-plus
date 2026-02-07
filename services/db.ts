import { Service, Lead, BlogPost, SiteConfig } from '../types';
import { INITIAL_SERVICES, INITIAL_POSTS, DEFAULT_CONFIG } from '../constants';

const STORAGE_KEYS = {
  SERVICES: 'mps_services',
  POSTS: 'mps_posts',
  LEADS: 'mps_leads',
  CONFIG: 'mps_config',
  AUTH: 'mps_auth_token'
};

export class MockDB {
  static init() {
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONFIG)) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([]));
    }
  }

  static getServices(): Service[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || '[]');
  }

  static getPosts(): BlogPost[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
  }

  static getLeads(): Lead[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
  }

  static getConfig(): SiteConfig {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFIG) || JSON.stringify(DEFAULT_CONFIG));
  }

  static saveConfig(newConfig: SiteConfig) {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(newConfig));
  }

  static addLead(lead: Omit<Lead, 'id' | 'date' | 'status'>): boolean {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new'
    };
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    // Simulate email sending
    console.log(`[MOCK EMAIL] To: ${this.getConfig().contactEmail}, Subject: New Lead, Body: ${JSON.stringify(newLead)}`);
    return true;
  }

  static login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === 'admin') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'mock-jwt-token');
      return true;
    }
    return false;
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH);
  }

  static logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}