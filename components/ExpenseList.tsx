
import React from 'react';
import { Expense } from '../types';
import { Trash2, ShoppingBag, Coffee, Car, Film, CreditCard, Heart, Package, Utensils, Zap, GraduationCap, Home, TrendingUp, Wallet, Smartphone, Banknote, Landmark, Calendar, Users, HardHat, Truck, Hammer } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  const iconClass = "w-5 h-5";
  switch (category) {
    case 'Labor Payment': return <Users className={`${iconClass} text-orange-600`} />;
    case 'Raw Materials': return <Package className={`${iconClass} text-amber-700`} />;
    case 'Fuel & Transport': return <Truck className={`${iconClass} text-blue-600`} />;
    case 'Machinery': return <Hammer className={`${iconClass} text-indigo-600`} />;
    case 'Site Expenses': return <HardHat className={`${iconClass} text-emerald-600`} />;
    case 'Office Rent': return <Home className={`${iconClass} text-slate-600`} />;
    case 'Project Payment': return <TrendingUp className={`${iconClass} text-emerald-600`} />;
    case 'Salary': return <Wallet className={`${iconClass} text-emerald-600`} />;
    case 'Entertainment': return <Film className={`${iconClass} text-indigo-400`} />;
    case 'Bills': return <Zap className={`${iconClass} text-amber-500`} />;
    case 'Health': return <Heart className={`${iconClass} text-rose-500`} />;
    default: return <Package className={`${iconClass} text-slate-400`} />;
  }
};

const PaymentIcon: React.FC<{ mode: string }> = ({ mode }) => {
    switch(mode) {
        case 'UPI': return <Smartphone className="w-3 h-3" />;
        case 'Cash': return <Banknote className="w-3 h-3" />;
        case 'Card': return <CreditCard className="w-3 h-3" />;
        case 'Bank Transfer': return <Landmark className="w-3 h-3" />;
        default: return null;
    }
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-24 px-6 glass rounded-[3rem] animate-in fade-in duration-700">
        <div className="bg-emerald-50 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
          <HardHat className="w-8 h-8 text-emerald-300" />
        </div>
        <h3 className="text-slate-900 font-extrabold text-xl mb-2">Ledger is Empty</h3>
        <p className="text-slate-400 text-sm max-w-[280px] mx-auto leading-relaxed">Start tracking your site expenses and project payments to maintain business health.</p>
      </div>
    );
  }

  const grouped = expenses.reduce((acc, exp) => {
    const date = exp.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exp);
    return acc;
  }, {} as Record<string, Expense[]>);

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {sortedDates.map((date) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' })}
            </span>
          </div>
          
          <div className="grid gap-4">
            {grouped[date].map((expense) => (
              <div 
                key={expense.id} 
                className="group glass p-5 rounded-[2rem] hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-500 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm ${expense.type === 'Income' ? 'border border-emerald-100' : 'border border-slate-50'}`}>
                    <CategoryIcon category={expense.category} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base leading-tight mb-1">{expense.description}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{expense.category}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600/60 uppercase">
                          <PaymentIcon mode={expense.paymentMode} />
                          {expense.paymentMode}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                      <span className={`block font-black text-xl tracking-tighter ${expense.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {expense.type === 'Income' ? '+' : '-'}₹{expense.amount.toLocaleString('en-IN')}
                      </span>
                  </div>
                  <button 
                    onClick={() => onDelete(expense.id)}
                    className="p-3 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
