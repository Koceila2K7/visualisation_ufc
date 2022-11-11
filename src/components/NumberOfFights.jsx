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
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

export default function NumberOfFights() {
  const ufcData = useSelector(
    (globalState) => globalState.ufcReducer.ufcData.data
  );
  const bFighters = d3.rollup(
    ufcData,
    (g) => g.length,
    (d) => d.B_fighter
  );
  const rFighters = d3.rollup(
    ufcData,
    (g) => g.length,
    (d) => d.R_fighter
  );
  const labels = [
    ...new Set([
      ...Array.from(rFighters.keys()),
      ...Array.from(bFighters.keys()),
    ]),
  ];

  const data = [];
  labels.forEach((e) => data.push(rFighters.get(e) + bFighters.get(e)));
  return (
    <Bar
      options={options}
      data={{
        labels: labels.slice(0, 10),
        datasets: [
          {
            label: '10 premiers combattans',
            data: data.slice(0, 10),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
}
