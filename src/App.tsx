import "./App.css";
import { Header } from "@/components/layout/Header";
import { TotalDisplayCards } from "@/components/cards/TotalDisplayCards";
import SpendingCardAndTransactions from "./components/spendingOverview/SpendingCardAndTransactions";
import { TransactionList } from "./components/spendingOverview/TransactionList";
import { useEffect, useState } from "react";
import { AddExpenseForm } from "./components/forms/AddExpenseForm";
import supabase from "@/lib/supabase";
import { useCategoriesList } from "./hooks/useCatagoriesList";
import {useExpenses} from "@/hooks/useExpenses";

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category?: string;
  category_id: number | null;
  date: string;
  user_id?: number;
  type: "expense" | "income";
}

const initialExpenses: Expense[] = [];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: categories } = useCategoriesList();
  const { data: expensesData, refetch: refetchExpenses } = useExpenses();

  const addExpense = async (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
    };

    const { data, error } = await supabase
      .from("expenses")
      .insert([{ ...newExpense }])
      .select();
    console.log(data, error, "supabase insert response");
    // close the form
    setShowAddForm(false);
    // refresh the expenses query so UI picks up the new item
    try {
      await refetchExpenses?.();
    } catch (err) {
      console.error('Error refetching expenses after insert', err);
    }
    // toast.success(`${expense.type === 'expense' ? 'Expense' : 'Income'} added successfully`);
  };

  const fetchExpenses = async () => {
    const AddCategoryToExpense = expensesData?.map((expense) => {
      const category = categories?.find(
        (cat) => expense.category_id != null && Number(cat.id) === expense.category_id
      );
      return {
        ...expense,
        category: category?.name,
      };
    });

    console.log(AddCategoryToExpense, "AddCategoryToExpense");

    setExpenses(AddCategoryToExpense || []);
  };

  useEffect(() => {
    fetchExpenses();
    // run when remote expenses or categories change (or when form visibility toggles)
  }, [expensesData, categories, showAddForm]);

  const deleteExpense = (id: number) => {
    console.log(id, "id to delete");
    setExpenses(expenses.filter((e) => e.id !== id));
    console.log(expenses, "expenses after deletion");
    // toast.success('Transaction deleted successfully');
  };

  return (
    <div className="min-h-screen">
      <Header setShowAddForm={setShowAddForm} />
      <TotalDisplayCards />
      <SpendingCardAndTransactions expenses={expenses} />
      <TransactionList
        expenses={expenses}
        onDelete={deleteExpense}
        showActions
      />
      <AddExpenseForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={addExpense}
      />
    </div>
  );
}

export default App;
