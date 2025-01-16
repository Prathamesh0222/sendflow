import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip
);

export default function TransactionChart({ data }: any) {
  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Transaction History",
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount",
          },
          beginAtZero: true,
        },
      },
    },
  };
  const chartData = {
    responsive: true,
    labels: data.labels,
    datasets: [
      {
        label: "Sent Amount",
        data: data.sentAmount,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: true,
      },
      {
        label: "Received Amount",
        data: data.receivedAmount,
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
