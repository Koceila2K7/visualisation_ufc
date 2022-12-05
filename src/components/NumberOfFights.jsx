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
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { UFC_DATA_FILTER_FIGHTER } from '../constants';

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
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Les 10 premiers combatans',
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
    .slice(0, 10);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Bar
        options={{
          ...options,

          onClick: (_, element) =>
            dispatch({
              type: UFC_DATA_FILTER_FIGHTER,
              payload: element.length === 0 ? null : data[element[0].index][0],
            }),
        }}
        data={{
          labels: data.map((e) => e[0]),

          datasets: [
            {
              label: 'Nombre de combats',
              data: data.map((e) => e[1]),
              borderColor: 'rgba(59,  78, 196, .9)',
              backgroundColor: 'rgba(59,  78, 196, .9)',
            },
          ],
        }}
      />
    </div>
  );
}
