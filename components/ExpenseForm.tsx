
import React, { useState } from 'react';
import { Category, Expense, TransactionType, PaymentMode } from '../types';
import { X, Check, IndianRupee, CreditCard, Smartphone, Banknote, Landmark } from 'lucide-react';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
}

// Fix: Updated CATEGORIES to strictly match the Category type defined in types.ts
const CATEGORIES: Category[] = [
  'Labor Payment', 'Raw Materials', 'Fuel & Transport', 'Machinery', 
  'Site Expenses', 'Entertainment', 'Bills', 'Health', 'Office Rent',
  'Education', 'Investment', 'Project Payment', 'Other'
];

const MODES: { label: PaymentMode; icon: React.ReactNode }[] = [
  { label: 'UPI', icon: <Smartphone className="w-4 h-4" /> },
  { label: 'Cash', icon: <Banknote className="w-4 h-4" /> },
  { label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Bank Transfer', icon: <Landmark className="w-4 h-4" /> }
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('Expense');
  // Fix: Changed initial state to a valid Category value
  const [category, setCategory] = useState<Category>('Site Expenses');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onSubmit({
      description,
      amount: parseFloat(amount),
      category,
      type,
      paymentMode,
      date,
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Type Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setType('Expense')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === 'Expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('Income')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === 'Income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
        >
          Income
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
          <input
            type="text"
            required
            // Fix: Updated placeholders to match the construction/contractor context
            placeholder={type === 'Expense' ? "e.g. Cement Purchase" : "e.g. Client Payment"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 bg-white/50 border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-700"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Amount (₹)</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <IndianRupee className="w-4 h-4" />
            </div>
            <input
                type="number"
                step="1"
                required
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full p-4 pl-10 bg-white/50 border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-lg ${type === 'Expense' ? 'text-rose-600 focus:border-rose-500' : 'text-emerald-600 focus:border-emerald-500'}`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full p-4 bg-white/50 border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none font-medium text-slate-600"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 bg-white/50 border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Payment Mode</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MODES.map((mode) => (
            <button
              key={mode.label}
              type="button"
              onClick={() => setPaymentMode(mode.label)}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all text-xs font-bold ${
                paymentMode === mode.label 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Notes</label>
        <textarea
          placeholder="Optional details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-4 bg-white/50 border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all h-20 font-medium text-slate-600 resize-none"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`flex-[2] flex items-center justify-center gap-2 py-4 text-white rounded-2xl font-extrabold shadow-xl transition-all active:scale-95 ${type === 'Expense' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
        >
          <Check className="w-5 h-5" /> Confirm {type}
        </button>
      </div>
    </form>
  );
};
