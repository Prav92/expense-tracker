import  { type FC } from "react";
import TotalBalanceCard from "./TotalBalanceCard";

interface IProps {}

export interface IViewDetails {
  name: string;
  icon: string;
  value: number;
  content: string;
}
[];

/**
 * @author
 * @function @TotalDisplayCards
 **/

export const TotalDisplayCards: FC<IProps> = (props) => {
  const viewDetails: IViewDetails[] = [
    {
      name: "Total Balance",
      icon: "dollar",
      value: 5000,
      content: "Positive balance",
    },
    {
      name: "Total Income",
      icon: "trending-up",
      value: 14000,
      content: "All time income",
    },
    {
      name: "Total Expense",
      icon: "trending-down",
      value: -900,
      content: "All time expense",
    },
    {
      name: "This Month",
      icon: "calendar",
      value: 600,
      content:
        new Date().toLocaleString("default", { month: "long" }) + " expenses",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      {viewDetails.map((item) => (
        <div key={item.name} className="col-span-1">
          <TotalBalanceCard
            name={item.name}
            icon={item.icon}
            value={item.value}
            content={item.content}
          />
        </div>
      ))}
    </div>
  );
};
