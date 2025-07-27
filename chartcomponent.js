import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';  // Import necessary charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartComponent = ({ data, chartType }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map(item => item.updated_at),  // Assuming the 'updated_at' column for X-axis labels
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        backgroundColor: [
          'rgba(0, 123, 255, 0.6)',  // Cool blue
          'rgba(0, 204, 255, 0.6)',  // Light cyan
          'rgba(0, 128, 128, 0.6)',  // Teal
          'rgba(0, 191, 255, 0.6)',  // Deep sky blue
          'rgba(100, 149, 237, 0.6)', // Cornflower blue
          'rgba(70, 130, 180, 0.6)',  // Steel blue
        ],
        borderColor: [
          'rgba(0, 123, 255, 1)',
          'rgba(0, 204, 255, 1)',
          'rgba(0, 128, 128, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(100, 149, 237, 1)',
          'rgba(70, 130, 180, 1)',
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue Analytics'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Revenue: $${tooltipItem.raw.toFixed(2)}`;
          }
        }
      }
    }
  };

  // Render the selected chart type
  return (
    <div>
      {chartType === 'bar' && <Bar data={chartData} options={chartOptions} />}
      {chartType === 'pie' && <Pie data={chartData} options={chartOptions} />}
      {chartType === 'line' && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default ChartComponent;
