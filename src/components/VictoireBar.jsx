import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Normbre de victoires et de pertes',
    },
  },
};

export default function VictoireBar({ pertes, victoire, labels }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Victoire',
        data: victoire,
        backgroundColor: 'rgba(59,  78, 196, .9)',
      },
      {
        label: 'Pertes',
        data: pertes,
        backgroundColor: 'rgba(210, 10, 10, 1)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
