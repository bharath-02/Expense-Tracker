import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./TopExpenses.css"; // Assuming this file contains the necessary styles

const TopExpenses = ({ transactions }) => {
  // Sort transactions by amount and slice the top 5 expenses
  const sortedTransactions = [...transactions].sort(
    (a, b) => b.amount - a.amount
  );
  const topTransactions = sortedTransactions.slice(0, 5);

  // Map the top expenses data for recharts
  const data = topTransactions.map((transaction) => ({
    title: transaction.title,
    amount: transaction.amount,
  }));

  // Define colors for the bars
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e", "#d62728"];

  return (
    <div>
      <h3 className="top-expenses-header">Top Expenses</h3>
      <div className="top-expenses-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 30, right: 30 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="title" />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopExpenses;
