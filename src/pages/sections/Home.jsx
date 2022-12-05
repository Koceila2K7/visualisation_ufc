import { Grid, IconButton } from '@mui/material';
// import * as d3 from 'd3';

import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Maps from '../../components/Maps';
import { UFC_FILTER_DATA } from '../../constants';
import LineChart from '../../components/LineChart';
import NumberOfFights from '../../components/NumberOfFights';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);
  const dispatch = useDispatch();
  const dataFilter = useSelector((globalState) => globalState.ufcHomeFilter);
  useEffect(() => {
    dispatch({ type: UFC_FILTER_DATA, payload: dataFilter });
  }, [dataFilter]);

  return (
    <Container>
      <Grid container spacing={5} style={{ padding: 4, marginTop: 2 }}>
        <Grid item xs={6}>
          <h4>Nombre de matches : </h4>
          <h3>{ufcData.length}</h3>
        </Grid>
        <Grid item xs={6}>
          <h4>{'   '}</h4>
          <IconButton aria-label="delete" size="small">
            <DashboardIcon />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <LineChart />
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <NumberOfFights />
        </Grid>
        <Grid item xs={12} md={12}>
          <Maps />
        </Grid>
      </Grid>
    </Container>
  );
}
