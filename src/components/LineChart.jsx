import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export default function LineChart() {
  const ufcData = useSelector(
    (globalState) => globalState.ufcReducer.ufcData.data
  );
  const dateMatches = d3.rollup(
    ufcData.map((e) => {
      const [day, month, year] = e.date.split('-');
      return {
        day,
        month,
        year,
      };
    }),
    (g) => g.length,
    (d) => d.year
  );
  return (
    <Line
      options={options}
      data={{
        labels: Array.from(dateMatches.keys()),
        datasets: [
          {
            label: 'Nombre de combats par années',
            data: Array.from(dateMatches.values()),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            hidden: false,
          },
        ],
      }}
    />
  );
}
