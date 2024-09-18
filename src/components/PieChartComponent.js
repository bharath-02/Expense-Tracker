import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

const PieChartComponent = ({ transactions }) => {
  const categoryData = transactions.reduce((acc, curr) => {
    const category = curr.category;
    const amount = curr.amount;
    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }
    return acc;
  }, {});

  const data = Object.keys(categoryData).map((category, index) => ({
    name: category,
    value: categoryData[category],
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
