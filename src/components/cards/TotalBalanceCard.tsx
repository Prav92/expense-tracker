import React, { type FC } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, TrendingDown, TrendingUp, DollarSign, Calendar } from 'lucide-react';

/**
* @author
* @function @TotalBalanceCard
**/

  const TotalBalanceCard = ({name, icon, value, content}: {name: string; icon: string; value: number; content: string;}) => {
  let balance = value;
  return (
    <Card className="text-justify border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900-400">
           {name}
          </CardTitle>
          {icon === "dollar" && <DollarSign className="h-4 w-4 text-gray-400" />}
          {icon === "trending-up" && <TrendingUp className="h-4 w-4 text-green-400" />}
          {icon === "trending-down" && <TrendingDown className="h-4 w-4 text-red-400" />}
          {icon === "calendar" && <Calendar className="h-4 w-4 text-gray-400" />}
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          <div
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${balance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {content}
          </p>
        </CardContent>
      </Card>
   )
 }

export default TotalBalanceCard;