import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StrikingStats({ clinch, ground, standing }) {
  const data = {
    labels: ['Clinch', 'Ground', 'Standing'],
    datasets: [
      {
        label: 'Siginificant striking by position',
        data: [clinch, ground, standing],
        backgroundColor: [
          'rgba(210, 10, 10, 1)',
          'rgba(210, 10, 10, 0.45)',
          'rgba(59,  78, 196, .9)',
        ],
        borderColor: [
          'rgba(210, 10, 10, .25)',
          'rgba(210, 10, 10, .25)',
          '#9395c4',
          '#9395c4',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} style={{ maxHeight: 400 }} />;
}
