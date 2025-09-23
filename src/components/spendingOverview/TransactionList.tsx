import React, { type FC } from 'react'
import type { Expense } from "../../App";
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Trash2, Search, Filter } from 'lucide-react';
interface IProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  showActions?: boolean;
}

/**
* @author
* @function @TransactionList
**/

const categoryColors: Record<string, string> = {
  'Food': 'bg-orange-100 text-orange-800',
  'Transportation': 'bg-blue-100 text-blue-800',
  'Entertainment': 'bg-purple-100 text-purple-800',
  'Utilities': 'bg-yellow-100 text-yellow-800',
  'Healthcare': 'bg-red-100 text-red-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Travel': 'bg-green-100 text-green-800',
  'Education': 'bg-indigo-100 text-indigo-800',
  'Income': 'bg-emerald-100 text-emerald-800',
  'Other': 'bg-gray-100 text-gray-800'
};

export const TransactionList:FC<IProps> = ({ expenses, onDelete, showActions }) => {


  const expenseList = showActions ? expenses : expenses.slice(0, 5);

  return (
    <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-gray-200 '>
      <h2 className='font-normal text-left px-3'>{showActions ? "All Transactions" : "Recent Transactions"}</h2>
      <ul className='flex flex-col gap-4'>
        {expenseList.map((expense) => (
          <li key={expense.id} className='flex justify-between px-4 py-4 border-b border-gray-200'>
            <div className='font-semibold flex flex-col text-left'>
              <div className='flex items-center gap-3 mb-1'>
                <p className='font-medium truncate'>{expense.description}</p>
                <Badge className={`mt-1 ${categoryColors[expense.category] || 'bg-gray-100 text-gray-800'}`}>
                  {expense.category}
                  <p>-</p>
                </Badge>
              </div>
              <span className='text-gray-400 text-xs'> {new Date(expense.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3">
               <span className={(expense.type == "income" ? "text-green-500" : "text-red-500") + " font-semibold text-sm"}>{expense.type == "income" ? "+" : "-"}${Math.abs(expense.amount)}</span>
              {showActions && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(expense.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
          </li>
        ))}
      </ul>
    </div>
   )
 }
