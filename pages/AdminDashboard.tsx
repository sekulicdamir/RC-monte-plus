import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileText, Settings, LogOut, LayoutGrid, CheckSquare, Save } from 'lucide-react';
import { MockDB } from '../services/db';
import { Lead, SiteConfig, LanguageCode } from '../types';
import { Card, Button } from '../components/UIComponents';
import { useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../constants';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(MockDB.isAuthenticated());
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'cms'>('overview');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [editLang, setEditLang] = useState<LanguageCode>('en');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setLeads(MockDB.getLeads());
      setSiteConfig(MockDB.getConfig());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (MockDB.login(loginData.user, loginData.pass)) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials (use admin/admin)');
    }
  };

  const handleLogout = () => {
    MockDB.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleConfigChange = (field: 'aboutTitle' | 'aboutSubtitle' | 'aboutContent', lang: LanguageCode, value: string) => {
    if (!siteConfig) return;
    setSiteConfig({
        ...siteConfig,
        [field]: {
            ...(siteConfig[field] as Record<LanguageCode, string>),
            [lang]: value
        }
    });
  };

  const handleNonTranslatableConfigChange = (field: 'phoneNumber' | 'contactEmail' | 'address', value: string) => {
    if (!siteConfig) return;
    setSiteConfig({
        ...siteConfig,
        [field]: value
    });
  };

  const saveSiteConfig = () => {
      if (siteConfig) {
          MockDB.saveConfig(siteConfig);
          alert('Configuration saved successfully!');
      }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                value={loginData.user}
                onChange={e => setLoginData({...loginData, user: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                value={loginData.pass}
                onChange={e => setLoginData({...loginData, pass: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full py-3 bg-cyan-700 hover:bg-cyan-800">Login</Button>
            <p className="text-xs text-center text-slate-400 mt-4">Hint: admin / admin</p>
          </form>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Mon', leads: 4 },
    { name: 'Tue', leads: 3 },
    { name: 'Wed', leads: 7 },
    { name: 'Thu', leads: 2 },
    { name: 'Fri', leads: 6 },
    { name: 'Sat', leads: 8 },
    { name: 'Sun', leads: 5 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-600">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col text-slate-300">
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white">MPS Admin</h1>
        </div>
        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-left font-medium transition-colors ${activeTab === 'overview' ? 'bg-cyan-700 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutGrid size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-left font-medium transition-colors ${activeTab === 'leads' ? 'bg-cyan-700 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={20} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab('cms')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-left font-medium transition-colors ${activeTab === 'cms' ? 'bg-cyan-700 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText size={20} /> CMS
          </button>
        </nav>
        <div className="p-8 border-t border-slate-800">
            <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-400 font-medium transition-colors">
                <LogOut size={20} /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto h-screen">
        <div className="mb-10 flex justify-between items-center md:hidden">
            <h1 className="text-2xl font-bold text-slate-900">Admin</h1>
            <Button onClick={handleLogout} variant="outline" className="text-sm px-4 py-2 h-auto border-slate-300 text-slate-600">Logout</Button>
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-slate-500 mb-2 text-sm font-semibold uppercase tracking-wider">Total Leads</div>
                <div className="text-4xl font-bold text-slate-900">{leads.length}</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-slate-500 mb-2 text-sm font-semibold uppercase tracking-wider">Active Services</div>
                <div className="text-4xl font-bold text-slate-900">{MockDB.getServices().length}</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-slate-500 mb-2 text-sm font-semibold uppercase tracking-wider">Blog Posts</div>
                <div className="text-4xl font-bold text-slate-900">{MockDB.getPosts().length}</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-96">
                <h3 className="font-bold text-lg text-slate-900 mb-8">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                            cursor={{fill: '#f1f5f9'}}
                        />
                        <Bar dataKey="leads" fill="#107490" radius={[6, 6, 6, 6]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-8 animate-fade-in-up">
             <h2 className="text-3xl font-bold text-slate-900">Requests</h2>
             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                 <table className="w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-200">
                         <tr>
                             <th className="p-6 font-semibold text-slate-500 text-sm uppercase tracking-wider">Date</th>
                             <th className="p-6 font-semibold text-slate-500 text-sm uppercase tracking-wider">Name</th>
                             <th className="p-6 font-semibold text-slate-500 text-sm uppercase tracking-wider">Contact</th>
                             <th className="p-6 font-semibold text-slate-500 text-sm uppercase tracking-wider">Service</th>
                             <th className="p-6 font-semibold text-slate-500 text-sm uppercase tracking-wider">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {leads.map(lead => (
                             <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                 <td className="p-6 text-slate-500 font-medium">{new Date(lead.date).toLocaleDateString()}</td>
                                 <td className="p-6 font-bold text-slate-900">{lead.fullName}</td>
                                 <td className="p-6">
                                     <div className="text-sm font-medium text-slate-900">{lead.email}</div>
                                     <div className="text-sm text-slate-400">{lead.phone}</div>
                                 </td>
                                 <td className="p-6 text-sm max-w-xs truncate text-slate-600 font-medium">
                                     {lead.serviceTypes.join(', ')}
                                 </td>
                                 <td className="p-6">
                                     <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs uppercase font-bold tracking-wide">New</span>
                                 </td>
                             </tr>
                         ))}
                         {leads.length === 0 && (
                             <tr><td colSpan={5} className="p-12 text-center text-slate-400">No leads found yet.</td></tr>
                         )}
                     </tbody>
                 </table>
             </div>
          </div>
        )}

        {activeTab === 'cms' && siteConfig && (
            <div className="space-y-8 animate-fade-in-up">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h2 className="text-3xl font-bold text-slate-900">Content Management</h2>
                    <Button onClick={saveSiteConfig} className="bg-cyan-700 hover:bg-cyan-800 text-sm py-3 px-6 h-auto">
                        <Save size={16} /> Save Changes
                    </Button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-xl text-slate-900 mb-6">About Page Content</h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Editing Language</label>
                        <select 
                            value={editLang}
                            onChange={(e) => setEditLang(e.target.value as LanguageCode)}
                            className="w-full max-w-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                        >
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Page Title ({editLang.toUpperCase()})</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                                value={siteConfig.aboutTitle[editLang] || ''}
                                onChange={(e) => handleConfigChange('aboutTitle', editLang, e.target.value)}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Page Subtitle ({editLang.toUpperCase()})</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                                value={siteConfig.aboutSubtitle[editLang] || ''}
                                onChange={(e) => handleConfigChange('aboutSubtitle', editLang, e.target.value)}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Main Content ({editLang.toUpperCase()})</label>
                            <textarea
                                rows={5}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all resize-y"
                                value={siteConfig.aboutContent[editLang] || ''}
                                onChange={(e) => handleConfigChange('aboutContent', editLang, e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-xl text-slate-900 mb-6">General Contact Info</h3>
                     <div className="space-y-6">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                                value={siteConfig.phoneNumber}
                                onChange={(e) => handleNonTranslatableConfigChange('phoneNumber', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contact Email</label>
                            <input 
                                type="email"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                                value={siteConfig.contactEmail}
                                onChange={(e) => handleNonTranslatableConfigChange('contactEmail', e.target.value)}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white text-slate-900 outline-none transition-all"
                                value={siteConfig.address}
                                onChange={(e) => handleNonTranslatableConfigChange('address', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};