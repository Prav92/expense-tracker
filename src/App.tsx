
import './App.css'
import { Header } from "@/components/layout/Header"
import { TotalDisplayCards } from "@/components/cards/TotalDisplayCards"
import SpendingCardAndTransactions from './components/spendingOverview/SpendingCardAndTransactions'
import { TransactionList } from './components/spendingOverview/TransactionList';
import { useState } from 'react';
import { AddExpenseForm } from './components/forms/AddExpenseForm';
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

const initialExpenses: Expense[] = [
  { id: '1', amount: 45.99, description: 'Grocery shopping', category: 'Food', date: '2025-01-28', type: 'expense' },
  { id: '2', amount: 12.50, description: 'Coffee', category: 'Food', date: '2025-01-28', type: 'expense' },
  { id: '3', amount: 85.00, description: 'Gas bill', category: 'Utilities', date: '2025-01-27', type: 'expense' },
  { id: '4', amount: 2500.00, description: 'Salary', category: 'Income', date: '2025-01-25', type: 'income' },
  { id: '5', amount: 29.99, description: 'Netflix subscription', category: 'Entertainment', date: '2025-01-26', type: 'expense' },
  { id: '6', amount: 150.00, description: 'Utilities', category: 'Utilities', date: '2025-01-25', type: 'expense' },
  { id: '7', amount: 75.00, description: 'Restaurant dinner', category: 'Food', date: '2025-01-24', type: 'expense' },
  { id: '8', amount: 200.00, description: 'Freelance work', category: 'Income', date: '2025-01-23', type: 'income' },
  { id: '9', amount: 32.50, description: 'Gas station', category: 'Transportation', date: '2025-01-22', type: 'expense' },
  { id: '10', amount: 120.00, description: 'Online shopping', category: 'Shopping', date: '2025-01-21', type: 'expense' },
];

function App() {

   const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showAddForm, setShowAddForm] = useState(false);

   const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setShowAddForm(false);
    // toast.success(`${expense.type === 'expense' ? 'Expense' : 'Income'} added successfully`);
  };

  const deleteExpense = (id: string) => {
    console.log(id, "id to delete");
    setExpenses(expenses.filter(e => e.id !== id));
    console.log(expenses, "expenses after deletion");
    // toast.success('Transaction deleted successfully');
  };

  return (
    <div className='min-h-screen'>
      <Header setShowAddForm={setShowAddForm} />
      <TotalDisplayCards />
      <SpendingCardAndTransactions expenses={expenses} />
      <TransactionList expenses={expenses} onDelete={deleteExpense} showActions />
      <AddExpenseForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={addExpense}
      />
    </div>
  )
}

export default App
