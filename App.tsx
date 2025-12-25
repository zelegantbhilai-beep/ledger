
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import { Insights } from './components/Insights';
import { Profile } from './components/Profile';
import { Expense, User } from './types';
import { Plus, LayoutDashboard, List, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('wealthsense_user');
    return saved ? JSON.parse(saved) : {
      name: "Premium User",
      email: "wealth.master@wealthsense.app",
      photoUrl: "https://picsum.photos/200/200?seed=luxury",
      bio: "Wealth Enthusiast & Digital Minimalist",
      currency: "INR"
    };
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('wealthsense_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'insights' | 'add' | 'profile'>('dashboard');

  useEffect(() => {
    localStorage.setItem('wealthsense_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('wealthsense_user', JSON.stringify(user));
  }, [user]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId: Expense = {
      ...newExpense,
      id: Math.random().toString(36).substr(2, 9),
    };
    setExpenses(prev => [expenseWithId, ...prev]);
    setActiveTab('dashboard');
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to erase all financial records? This cannot be undone.")) {
      setExpenses([]);
      setActiveTab('dashboard');
    }
  };

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, e) => (e.type === 'Expense' ? sum + e.amount : sum), 0);
  }, [expenses]);

  return (
    <Layout user={user} activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-4xl mx-auto pb-40 px-5 pt-10">
        {activeTab === 'dashboard' && (
          <Dashboard expenses={expenses} totalSpent={totalSpent} />
        )}
        
        {activeTab === 'transactions' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end px-2">
              <div>
                <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">The Ledger</h2>
                <p className="text-slate-400 text-sm font-medium">Historical transaction records</p>
              </div>
              <button 
                onClick={() => setActiveTab('add')}
                className="bg-emerald-600 text-white p-3.5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-90"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>
        )}

        {activeTab === 'insights' && (
          <Insights expenses={expenses} />
        )}

        {activeTab === 'profile' && (
          <Profile user={user} setUser={setUser} expenses={expenses} onClearData={clearAllData} />
        )}

        {activeTab === 'add' && (
          <div className="glass rounded-[3rem] p-10 premium-shadow animate-in zoom-in-95 duration-500">
            <div className="mb-10">
                <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">New Entry</h2>
                <p className="text-slate-400 font-medium text-base mt-2">Log your financial movements with precision.</p>
            </div>
            <ExpenseForm onSubmit={addExpense} onCancel={() => setActiveTab('dashboard')} />
          </div>
        )}
      </div>

      {/* Floating Premium Navigation Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50">
          <nav className="glass border border-white/50 rounded-[3rem] p-3 flex justify-between items-center premium-shadow">
            <NavButton 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Home" 
            />
            <NavButton 
              active={activeTab === 'transactions'} 
              onClick={() => setActiveTab('transactions')} 
              icon={<List className="w-5 h-5" />} 
              label="Logs" 
            />
            <button 
              onClick={() => setActiveTab('add')}
              className="flex items-center justify-center bg-emerald-600 text-white w-16 h-16 rounded-[2rem] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 mx-2"
            >
              <Plus className="w-8 h-8" strokeWidth={3} />
            </button>
            <NavButton 
              active={activeTab === 'insights'} 
              onClick={() => setActiveTab('insights')} 
              icon={<Sparkles className="w-5 h-5" />} 
              label="Brain" 
            />
            <NavButton 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')} 
              icon={<div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white"><img src={user.photoUrl} className="w-full h-full object-cover" alt="Profile" /></div>} 
              label="Profile" 
            />
          </nav>
      </div>
    </Layout>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-1 transition-all duration-500 py-2 ${active ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`transition-all duration-500 ${active ? 'scale-110 -translate-y-0.5' : 'scale-100 opacity-60'}`}>
        {icon}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all ${active ? 'opacity-100' : 'opacity-40'}`}>{label}</span>
  </button>
);

export default App;
