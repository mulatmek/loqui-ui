import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chart.js/auto";
import "./Table.css";

Chart.register(...registerables);

const Table = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Extracting data from the props
    const labels = props.prediction.map(([label]) => label);
    const data = props.prediction.map(([, percent]) => percent);

    // Destroy previous chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Creating the chart
    const ctx = chartRef.current.getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Percent",
            data: data,
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100, // Adjust the maximum value according to your data
          },
        },
      },
    });

    // Store the chart instance for future destruction
    chartInstanceRef.current = newChartInstance;
  }, [props.prediction]);
  return (
    <div className='table-container'>
      <h2 className="table-header">Top 5 Predictions</h2>
      <table className="table-prediction">
        <thead>
          <tr>
            <th>Label</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {props.prediction.map(([label, percent]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{Number(percent).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Table;
