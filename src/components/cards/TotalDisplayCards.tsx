import  { useEffect, useState, type FC } from "react";
import TotalBalanceCard from "./TotalBalanceCard";
import supabase from "@/lib/supabase";

interface IProps {}

export interface IViewDetails {
  name: string;
  icon: string;
  value: number;
  content: string;
  type: string;
}
[];

/**
 * @author
 * @function @TotalDisplayCards
 **/

export const TotalDisplayCards: FC<IProps> = () => {

  const [cardsData, setCardsData] = useState<IViewDetails[]>([]);
  const viewDetails: IViewDetails[] = [
    {
      name: "Total Balance",
      icon: "dollar",
      value: 5000,
      content: "Positive balance",
      type: "total_balance",
    },
    {
      name: "Total Income",
      icon: "trending-up",
      value: 14000,
      content: "All time income",
      type: "total_income",
    },
    {
      name: "Total Expense",
      icon: "trending-down",
      value: -900,
      content: "All time expense",
      type: "total_expense",
    },
    {
      name: "This Month",
      icon: "calendar",
      value: 600,
      content:
        new Date().toLocaleString("default", { month: "long" }) + " expenses",
      type: "this_month",
    },
  ];

  const fetchFinancialSummary = async () => {
        let { data, error } = await supabase
        .rpc('get_financial_summary', {
          p_user_id: 1
        });
        if (error) console.error(error);
        else viewDetails.map((total) => {
            console.log(data.hasOwnProperty(total.type));
             data.hasOwnProperty(total.type)
              ? (total.value = data[total.type])
              : total.value;
        }); // Fetch data or perform side effects here
      setCardsData(viewDetails);
      };

  useEffect(() => {
      fetchFinancialSummary();
    }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      {cardsData.map((item) => (
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
