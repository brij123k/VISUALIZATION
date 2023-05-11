import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
