"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function StockBarChart({ products }) {
  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Stock",
        data: products.map((p) => p.stock),
        backgroundColor: "#6366f1",
      },
    ],
  };

 
  const options = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: { 
      display: true, 
      position: 'top',
      labels: { color: '#94a3b8', boxWidth: 12 }
    },
  },
};

  return (
  <div className="w-full h-full flex flex-col">
    <h3 className="text-[10px] font-bold mb-1 text-gray-500 uppercase tracking-widest">
      Stock Levels
    </h3>
    <div className="flex-1 min-h-0 relative">
      <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
    </div>
  </div>
);
}
