import React, { type FC } from 'react'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react';

interface IProps {
setShowAddForm: (show: boolean) => void;
}

/**
* @author
* @function @Header
**/

export const Header:FC<IProps> = ({ setShowAddForm }) => {
  return (
    <header className="bg-white">
      <div className="flex items-center justify-between">
        <div className="text-justify">
          <h1 className=" text-2xl font-bold mb-2">Expense Tracker</h1>
          <div className="flex text-gray-400">Track your expenses and manage your budget</div>
        </div>
        <Button className="bg-black text-white rounded-md hover:bg-gray-800 py-2 px-4" onClick={() => setShowAddForm(true)}>
         <PlusCircle className="h-4 w-4" /> Add Expense
        </Button>
      </div>
    </header>
  )
}
