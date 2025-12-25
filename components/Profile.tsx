
import React, { useState } from 'react';
import { Expense, User } from '../types';
import { Settings, Shield, ChevronRight, Edit3, Trash2, Bell, Smartphone, ShieldCheck } from 'lucide-react';

interface ProfileProps {
  user: User;
  setUser: (user: User) => void;
  expenses: Expense[];
  onClearData: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, setUser, expenses, onClearData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const stats = React.useMemo(() => {
    const totalTransactions = expenses.length;
    const upiCount = expenses.filter(e => e.paymentMode === 'UPI').length;
    return { totalTransactions, upiCount };
  }, [expenses]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="glass rounded-[3rem] p-10 premium-shadow animate-in zoom-in-95 duration-500">
        <h2 className="text-3xl font-black text-emerald-950 tracking-tighter mb-8">Edit Portfolio Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Name</label>
            <input 
              type="text" 
              value={editForm.name}
              onChange={e => setEditForm({...editForm, name: e.target.value})}
              className="w-full p-4 glass border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-slate-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Headline</label>
            <textarea 
              value={editForm.bio}
              onChange={e => setEditForm({...editForm, bio: e.target.value})}
              className="w-full p-4 glass border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 font-medium text-slate-800 h-24 resize-none"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-extrabold shadow-lg shadow-emerald-100"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Profile Card */}
      <div className="glass rounded-[3rem] p-10 premium-shadow flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-emerald-100 to-emerald-200 p-1.5 shadow-xl overflow-hidden">
            <img 
              src={user.photoUrl} 
              className="w-full h-full object-cover rounded-[2.7rem]" 
              alt="User" 
            />
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-2.5 rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-transform"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight">{user.name}</h2>
        <p className="text-emerald-600/60 font-black text-[10px] uppercase tracking-[0.3em] mt-1">{user.bio || 'Managing Assets Privately'}</p>
        
        <div className="grid grid-cols-2 gap-8 mt-10 w-full border-t border-slate-100 pt-8">
          <div>
            <p className="text-3xl font-black text-slate-800 tracking-tighter">{stats.totalTransactions}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Records</p>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-800 tracking-tighter">{stats.upiCount}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">UPI Velocity</p>
          </div>
        </div>
      </div>

      {/* Profile Management Section */}
      <div className="space-y-4">
        <h3 className="px-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Personalization</h3>
        <div className="glass rounded-[2.5rem] overflow-hidden divide-y divide-slate-50 premium-shadow">
          <ProfileLink onClick={() => setIsEditing(true)} icon={<Edit3 className="text-emerald-600" />} label="Edit Portfolio Details" description="Update name & professional bio" />
          <ProfileLink onClick={() => {}} icon={<Bell className="text-emerald-600" />} label="Notification Center" description="Configure wealth alerts" />
          <ProfileLink onClick={() => {}} icon={<ShieldCheck className="text-emerald-600" />} label="Security Protocol" description="Biometric & Session lock" />
          <ProfileLink onClick={() => {}} icon={<Smartphone className="text-emerald-600" />} label="Device Preferences" description="Dark mode & Language" />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="grid gap-4">
        <button 
          onClick={onClearData}
          className="w-full flex items-center justify-between p-6 glass rounded-3xl border-rose-50 text-rose-500 hover:bg-rose-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-rose-100 p-2.5 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-sm tracking-tight">Flush Financial History</span>
              <span className="block text-[10px] font-medium text-rose-400">Permanently erase all local data</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-200" />
        </button>
      </div>

      <div className="pb-10 pt-4 flex justify-center items-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
         <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">WealthSense v2.5 Local</span>
         <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
      </div>
    </div>
  );
};

interface ProfileLinkProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ icon, label, description, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-6 hover:bg-emerald-50/30 transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" }) : icon}
      </div>
      <div className="text-left">
        <span className="block font-bold text-slate-800 text-sm tracking-tight">{label}</span>
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{description}</span>
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
  </button>
);
