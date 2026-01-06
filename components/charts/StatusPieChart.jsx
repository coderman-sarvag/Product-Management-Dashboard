"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatusPieChart({ products }) {
  const statusCount = products.reduce(
    (acc, product) => {
      acc[product.status] =
        (acc[product.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: [
          "#22c55e", 
          "#f59e0b", 
          "#ef4444", 
        ],
      },
    ],
  };

  return (
    <div className="flex-1 min-h-0 w-full">
    <h3 className="text-xs font-medium mb-1 text-gray-400 uppercase tracking-wider">
        Product Status Distribution
      </h3>
      <div className="h-[calc(100%-20px)]">
      <Pie data={data} /></div>
    </div>
  );
}
