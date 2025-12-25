
import React from 'react';
import { Expense } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, ArrowDown, Wallet, IndianRupee, ArrowUpCircle, ArrowDownCircle, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  expenses: Expense[];
  totalSpent: number;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const { totalIncome, totalExpense } = React.useMemo(() => {
    return expenses.reduce((acc, curr) => {
      if (curr.type === 'Income') acc.totalIncome += curr.amount;
      else acc.totalExpense += curr.amount;
      return acc;
    }, { totalIncome: 0, totalExpense: 0 });
  }, [expenses]);

  const netBalance = totalIncome - totalExpense;

  const categoryData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    expenses.filter(e => e.type === 'Expense').forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + e.amount;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const COLORS = ['#059669', '#fbbf24', '#0ea5e9', '#8b5cf6', '#ec4899', '#f43f5e', '#64748b'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Luxury Balance Card */}
      <div className="hero-gradient rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-900/20">
        <div className="relative z-10 flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-50">Private Wealth Portfolio</span>
            </div>
            <Wallet className="w-6 h-6 text-emerald-200/50" />
          </div>

          <div>
            <p className="text-emerald-100/60 text-xs font-semibold tracking-wider uppercase mb-2">Net Cash Liquidity</p>
            <h2 className="text-6xl font-extrabold tracking-tighter flex items-baseline gap-1">
              <span className="text-3xl font-medium text-emerald-200/70">₹</span>
              {netBalance.toLocaleString('en-IN')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1 border-l border-emerald-500/30 pl-4">
              <div className="flex items-center gap-1.5 text-emerald-300/80 text-[10px] font-bold uppercase tracking-wider">
                <ArrowUpCircle className="w-3 h-3" /> Inflow
              </div>
              <p className="text-2xl font-bold tracking-tight">₹{totalIncome.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1 border-l border-rose-500/30 pl-4">
              <div className="flex items-center gap-1.5 text-rose-300/80 text-[10px] font-bold uppercase tracking-wider">
                <ArrowDownCircle className="w-3 h-3" /> Outflow
              </div>
              <p className="text-2xl font-bold tracking-tight">₹{totalExpense.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Analytics */}
        <div className="glass rounded-[2.5rem] p-8 premium-shadow">
          <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center justify-between">
            Category Intensity
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </h3>
          <div className="h-64 relative">
             {categoryData.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 text-sm italic space-y-2">
                    <p>Portfolio data needed</p>
                </div>
             ) : (
                <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={105}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.15)', padding: '16px', background: '#fff' }}
                      formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Concentrated</p>
                    <p className="text-2xl font-black text-emerald-950 leading-none">₹{totalExpense > 999 ? (totalExpense/1000).toFixed(1) + 'k' : totalExpense}</p>
                </div>
                </>
             )}
          </div>
        </div>

        {/* Wealth Metrics */}
        <div className="glass rounded-[2.5rem] p-8 premium-shadow flex flex-col justify-between">
          <div className="space-y-8">
            <h3 className="font-bold text-slate-800 text-lg flex items-center justify-between">
              Performance Vitals
              <IndianRupee className="w-5 h-5 text-amber-500" />
            </h3>
            
            <div className="space-y-6">
                <MetricRow label="Primary Income" value={expenses.filter(e => e.type === 'Income').sort((a,b) => b.amount - a.amount)[0]?.category || 'N/A'} />
                <MetricRow label="Retention Rate" value={totalIncome > 0 ? `${Math.max(0, Math.round((netBalance / totalIncome) * 100))}%` : '0%'} />
                <MetricRow label="Payment Digitality" value={expenses.length > 0 ? `${Math.round((expenses.filter(e => e.paymentMode === 'UPI').length / expenses.length) * 100)}% UPI` : '0%'} />
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 mt-auto">
            <div className="flex justify-between mb-3 items-end">
               <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Financial Stability</p>
                 <p className="text-sm font-bold text-emerald-700">{netBalance > totalExpense ? 'Optimal Savings' : 'Review Spending'}</p>
               </div>
               <span className="text-[10px] font-black text-slate-400">{Math.round((totalExpense / (totalIncome || 1)) * 100)}% Burn</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${netBalance > 0 ? 'bg-emerald-600' : 'bg-rose-500'}`} 
                style={{ width: `${Math.min(Math.max((netBalance / (totalIncome || 1)) * 100, 5), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center group cursor-default">
    <span className="text-xs text-slate-400 font-bold uppercase tracking-[0.15em] group-hover:text-emerald-700 transition-colors duration-300">{label}</span>
    <span className="text-sm text-slate-900 font-extrabold tracking-tight">{value}</span>
  </div>
);
