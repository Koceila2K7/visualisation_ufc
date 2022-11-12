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
      text: 'Les 20 premiers combatans',
    },
  },
};

export default function NumberOfFights() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);

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

  let data = [];
  labels.forEach((e) =>
    data.push([
      e,
      (rFighters.get(e) ? rFighters.get(e) : 0) +
        (bFighters.get(e) ? bFighters.get(e) : 0),
    ])
  );
  data = data
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a[1] < b[1] ? 1 : a[1] === b[1] ? 0 : -1))
    .slice(0, 20);

  return (
    <Bar
      options={options}
      data={{
        labels: data.map((e) => e[0]),
        datasets: [
          {
            label: 'Nombre de combats',
            data: data.map((e) => e[1]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
}
