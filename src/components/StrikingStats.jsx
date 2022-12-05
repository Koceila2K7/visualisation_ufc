import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StrikingStats({ clinch, ground, standing, name }) {
  const data = {
    labels: ['Clinch', 'Ground', 'Standing'],
    datasets: [
      {
        data: [clinch, ground, standing],
        backgroundColor: [
          'rgba(210, 10, 10, 0.45)',
          'rgba(59,  78, 196, .9)',
          'rgba(210, 10, 10, .8)',
        ],

        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Positions de combats de ${name}`,
      },
    },
  };
  return (
    <div style={{ padding: 10 }}>
      <Pie options={options} data={data} style={{ maxHeight: 300 }} />
    </div>
  );
}
