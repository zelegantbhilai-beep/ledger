
import React, { useState, useEffect } from 'react';
import { Expense, SpendingInsight } from '../types';
import { getSpendingInsights } from '../services/geminiService';
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCcw, BrainCircuit, Lightbulb } from 'lucide-react';

interface InsightsProps {
  expenses: Expense[];
}

export const Insights: React.FC<InsightsProps> = ({ expenses }) => {
  const [insight, setInsight] = useState<SpendingInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchInsights = async () => {
    if (expenses.length < 3) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getSpendingInsights(expenses);
      if (data) setInsight(data);
      else setError(true);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expenses.length >= 3 && !insight) {
      fetchInsights();
    }
  }, [expenses]);

  if (expenses.length < 3) {
    return (
      <div className="premium-card rounded-[2.5rem] p-10 shadow-sm border border-emerald-100/50 text-center animate-in zoom-in-95 duration-500">
        <div className="bg-emerald-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
          <BrainCircuit className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">AI Wealth Coach</h3>
        <p className="text-slate-500 text-sm max-w-[280px] mx-auto mb-8 leading-relaxed font-medium">
          Feed me at least 3 transactions to generate your personalized financial strategy.
        </p>
        <div className="flex justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-100 animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 rounded-full bg-emerald-200 animate-bounce" style={{animationDelay: '200ms'}}></div>
            <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{animationDelay: '400ms'}}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Wealth Intelligence</h2>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all disabled:opacity-50 active:scale-90"
        >
          <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="premium-card rounded-[2.5rem] p-16 shadow-sm border border-emerald-100/50 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <div className="w-16 h-16 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-sm">
                <BrainCircuit className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <div className="text-center">
              <p className="text-slate-800 font-extrabold text-lg">Thinking Financially...</p>
              <p className="text-slate-400 text-sm font-medium">Calibrating Indian market trends</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-rose-50 rounded-[2rem] p-8 border border-rose-100 text-center">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
          <h4 className="text-rose-900 font-extrabold text-lg mb-2">Insight Jammed</h4>
          <p className="text-rose-600 text-sm mb-6 font-medium">The AI brain is having trouble processing. Mind trying again?</p>
          <button onClick={fetchInsights} className="bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors">Retry Connection</button>
        </div>
      ) : insight ? (
        <div className="space-y-6">
          {/* Summary Card with Glassmorphism */}
          <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden transition-all duration-500 ${
            insight.riskLevel === 'Low' ? 'bg-emerald-50/80 border-emerald-200' :
            insight.riskLevel === 'Medium' ? 'bg-amber-50/80 border-amber-200' : 'bg-rose-50/80 border-rose-200'
          }`}>
             {/* Decorative pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Lightbulb className="w-32 h-32" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                insight.riskLevel === 'Low' ? 'bg-emerald-600 text-white' :
                insight.riskLevel === 'Medium' ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                {insight.riskLevel} Risk Profile
              </span>
            </div>
            <p className="text-slate-800 font-bold text-xl leading-relaxed relative z-10 italic">
              "{insight.summary}"
            </p>
          </div>

          {/* Actionable Strategy List */}
          <div className="premium-card rounded-[2.5rem] p-8 shadow-sm border border-emerald-100/50 space-y-6">
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
              Strategy for Growth
            </h4>
            <div className="grid gap-4">
              {insight.suggestions.map((s, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white/40 rounded-[1.5rem] border border-white hover:border-emerald-200 hover:bg-white/60 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <p className="text-base text-slate-700 font-semibold leading-snug">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
