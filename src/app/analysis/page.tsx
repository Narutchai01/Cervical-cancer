"use client";
import React from "react";
import { useAnalysis } from "@/context/analysisContext";
import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
);

export default function AnalysisPage() {
  const { chartResult, result } = useAnalysis();

  const chartData = {
    labels: ["สูตร 1", "สูตร 2", "สูตร 3", "สูตร 4", "สูตร 5"],
    datasets: [
      {
        label: "My First Dataset",
        data: chartResult,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // This makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false, // Add this line to allow custom height
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center w-full gap-y-2">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-center">
            คุณมีโอกาสเป็น มะเร็งปากมดลูก
          </h1>
          <div className="border-8 rounded-full font-bold size-32 text-3xl flex justify-center items-center border-red-400 p-2 md:p-4 lg:p-6">
            <h1>{result().toFixed(0)}%</h1>
          </div>
          <div className="h-64 md:h-80 lg:h-96 w-full">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
