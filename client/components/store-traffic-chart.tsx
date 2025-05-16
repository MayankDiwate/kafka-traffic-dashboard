"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HourlyTraffic } from "./dashboard";

export default function StoreTrafficChart({ data }: { data: HourlyTraffic[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-muted-foreground">No historical data available</p>
      </div>
    );
  }

  // Format data for the chart
  const chartData = data.map((item) => ({
    hour: item.hour,
    "Customers In": item.customers_in,
    "Customers Out": item.customers_out,
    "Net Change": item.net_change,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Customers In" fill="#22c55e" />
        <Bar dataKey="Customers Out" fill="#ef4444" />
        <Bar dataKey="Net Change" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
