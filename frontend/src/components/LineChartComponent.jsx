import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "4/10/2022",
//     value: 39,
//   },
//   {
//     name: "5/10/2022",
//     value: 382,
//   },
//   {
//     name: "6/10/2022",
//     value: 20,
//   },
//   {
//     name: "7/10/2022",
//     value: 80,
//   },
// ];

function LineChartComponent({ chart2Data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chart2Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
