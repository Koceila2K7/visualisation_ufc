import { Grid } from '@mui/material';
// import * as d3 from 'd3';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { Container } from '@mui/system';
import Maps from '../../components/Maps';
import LineChart from '../../components/LineChart';
import NumberOfFights from '../../components/NumberOfFights';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);
  // console.log(d3.group(ufcData.data.data, el=>el.location))
  /* const weightClass = d3.rollup(
    ufcData.data,
    (g) => g.length,
    (d) => d.weight_class
  );
   const weightClassData = {
    labels: Array.from(weightClass.keys()),
    datasets: [
      {
        label: 'Nombre de matchs par catégorie',
        data: Array.from(weightClass.values()),
        backgroundColor: [
          'rgba(255, 99, 132, .2)',
          'rgba(54, 162, 235, .2)',
          'rgba(255, 206, 86, .2)',
          'rgba(75, 192, 192, .2)',
          'rgba(153, 102, 255, .2)',
          'rgba(255, 159, 64, .2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  */

  return (
    <Container>
      <Grid container spacing={5} style={{ padding: 4, marginTop: 2 }}>
        <Grid xs={12}>
          <h4>Nombre de matches : </h4>
          <h3>{ufcData.data.length}</h3>
        </Grid>
        <Grid item xs={6}>
          <Maps />
        </Grid>
        <Grid item xs={6}>
          <LineChart />
        </Grid>
        <Grid item xs={6}>
          <NumberOfFights />
        </Grid>
      </Grid>
    </Container>
  );
}
