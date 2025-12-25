
import React from 'react';
import { Wallet, Bell, Search } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass border-b border-emerald-50/10 px-8 py-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 group cursor-default">
          <div className="bg-emerald-600 p-3 rounded-2xl shadow-xl shadow-emerald-100 group-hover:rotate-6 transition-transform duration-500">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
              <h1 className="text-xl font-black text-emerald-950 tracking-tighter leading-none">
                Thekedaar Ledger
              </h1>
              <p className="text-[10px] font-black text-emerald-600/40 uppercase tracking-[0.3em] mt-1">Contractor OS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-slate-100/50 px-4 py-2 rounded-2xl border border-slate-200/20">
                <Search className="w-4 h-4 text-slate-300" />
                <span className="text-xs text-slate-300 font-medium">Search Entries...</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-emerald-700 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
              <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover rounded-[0.9rem]" />
            </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
