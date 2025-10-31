import  { type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { Expense } from "../../App";
interface IProps {
  expenses: Expense[];
}

/**
 * @author
 * @function @SpendingOverView
 **/

const SpendingOverView: FC<IProps> = ({ expenses }) => {

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C',
  '#8DD1E1', '#D084D0'];

  const categoryData = expenses.filter(expense => expense.type === 'expense');

  const finalCategoryData = categoryData.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ category: expense.category || "", amount: expense.amount });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);

  const dailyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ date, amount: expense.amount });
    }
    return acc;
  }, [] as { date: string; amount: number }[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(-7) // Last 7 days
  .map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { category, amount } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-300 p-2 rounded">
        <p className="font-bold">{category}</p>
        <p>{`Amount: $${amount}`}</p>
      </div>
    );
  }
  return null;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-red-600">
            Amount: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-left font-normal">Spending Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="category" className="w-full flex">
            <TabsList className="flex w-full">
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="category" className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={finalCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ category, percent }) =>
                        `${category} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                  >
                    {finalCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="timeline">
              <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  );
};

export default SpendingOverView;
