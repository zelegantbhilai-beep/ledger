
import React, { useState } from 'react';
import { Wallet, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const simulateGoogleLogin = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin({
        name: "Aditya Sharma",
        email: "aditya.sharma@example.com",
        photoUrl: "https://picsum.photos/200/200?seed=luxury",
        bio: "Wealth Enthusiast & Digital Minimalist",
        currency: "INR"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-50 rounded-full blur-[120px] opacity-60"></div>

      <div className="glass rounded-[4rem] p-10 max-w-lg w-full premium-shadow text-center relative z-10 animate-in zoom-in-95 fade-in duration-1000">
        <div className="bg-emerald-600 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-200">
          <Wallet className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-5xl font-black text-emerald-950 tracking-tighter mb-4">
          WealthSense
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">
          Experience the pinnacle of personal finance management.
        </p>

        <div className="space-y-6 mb-12">
            <FeatureRow icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />} text="Private Wealth Encryption" />
            <FeatureRow icon={<Sparkles className="w-5 h-5 text-amber-500" />} text="AI Personal Coaching" />
        </div>

        <button 
          onClick={simulateGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-slate-100 shadow-xl rounded-[2rem] py-5 px-8 flex items-center justify-center gap-4 hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-extrabold text-slate-700 tracking-tight">Sign in with Google</span>
            </>
          )}
        </button>

        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
          Secure Banking Gateway
        </p>
      </div>
    </div>
  );
};

const FeatureRow = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center justify-center gap-3">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-50">
            {icon}
        </div>
        <span className="text-sm font-bold text-slate-700">{text}</span>
    </div>
);
