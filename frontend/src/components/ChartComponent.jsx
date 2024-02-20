import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartComponent({ chart1Data }) {
  console.log("char1data from chart component", chart1Data);
  // const data = [
  //   { name: "A", value: 1500 },
  //   {
  //     name: "B",
  //     value: 2000,
  //   },
  //   { name: "C", value: 3500 },
  //   {
  //     name: "D",
  //     value: 500,
  //   },
  //   {
  //     name: "E",
  //     value: 600,
  //   },
  //   {
  //     name: "F",
  //     value: 720,
  //   },
  // ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width="80%"
        height="80%"
        data={chart1Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="4 4" />
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar
          background
          dataKey="value"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ChartComponent;
