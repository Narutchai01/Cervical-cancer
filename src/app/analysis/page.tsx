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
  const { chartResult , result} =
    useAnalysis();

  

  const chartData = {
    labels: [
      "CBC + US + CA-125",
      "US + CA-125",
      "CBC + US",
      "US",
      "LFT + CA-125",
    ],
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
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1>{`${result().toFixed(2)} %`}</h1>
        <h1 className="text-2xl font-bold text-center">Analysis</h1>
        <div className="mt-4">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}
