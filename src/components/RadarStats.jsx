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
      'Précision',
      'Défence',
      'Absorption de coups',
      'Contrôle',
      'Réflexe',
      'Force',
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
        backgroundColor: 'rgba(210, 10, 10, .3)',
        borderColor: 'rgba(210, 10, 10, 1)',
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
        backgroundColor: 'rgba(59,  78, 196, .3)',
        borderColor: 'rgba(59,  78, 196, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={data} style={{ maxHeight: 400 }} />;
}
