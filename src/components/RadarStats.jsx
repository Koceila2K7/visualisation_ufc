import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarStats({
  statsB,
  statsR,

  fighterNameB,
  fighterNameR,
}) {
  const data = {
    labels: [
      'PRES Head',
      'PRES Leg',
      'PRES Body',
      'PRES Clinch',
      'PRES Ground',
      'PRES Standing',
    ],
    datasets: [
      {
        label: `stats de ${fighterNameR}`,
        data: [
          statsB.head,
          statsB.leg,
          statsB.body,
          statsB.clinch,
          statsB.ground,
          statsB.standing,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: `stats de ${fighterNameB}`,
        data: [
          statsR.head,
          statsR.leg,
          statsR.body,
          statsR.clinch,
          statsR.ground,
          statsR.standing,
        ],
        backgroundColor: '#9395c480',
        borderColor: '#9395c4',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={data} style={{ maxHeight: 400 }} />;
}
