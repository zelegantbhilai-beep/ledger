
export type Category = 
  | 'Labor Payment' 
  | 'Raw Materials' 
  | 'Fuel & Transport' 
  | 'Machinery' 
  | 'Site Expenses' 
  | 'Entertainment' 
  | 'Bills' 
  | 'Health' 
  | 'Office Rent'
  | 'Education'
  | 'Investment'
  | 'Project Payment'
  | 'Other';

export type TransactionType = 'Expense' | 'Income';

export type PaymentMode = 'UPI' | 'Cash' | 'Card' | 'Bank Transfer';

export interface User {
  name: string;
  email: string;
  photoUrl: string;
  bio?: string;
  currency: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
  type: TransactionType;
  paymentMode: PaymentMode;
  notes?: string;
}

export interface SpendingInsight {
  summary: string;
  suggestions: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}
