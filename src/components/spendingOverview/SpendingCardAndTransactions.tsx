import {type FC } from 'react'
import SpendingOverView from './SpendingOverView';
import type { Expense } from "../../App";
import { TransactionList } from './TransactionList';

interface IProps {
  expenses: Expense[];
}

/**
* @author
* @function @SpendingCard
**/

const SpendingCardAndTransactions:FC<IProps> = ({ expenses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-10 mb-10">
      <SpendingOverView expenses={expenses} />
      <TransactionList expenses={expenses} onDelete={() => {}} />
      
    </div>
   )
  }             

export default SpendingCardAndTransactions;
