/* eslint-disable camelcase */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getWinsAndLosses } from '../utils';
import RepartitionDesCoups from './RepartitionDesCoups';

function Card({ title, value }) {
  return (
    <Grid
      item
      xs={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      marginTop={5}
    >
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="h6" component="h2">
        {value}
      </Typography>
    </Grid>
  );
}

export default function FighterStats() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);

  const fighterName = useSelector(
    (globalState) => globalState.ufcHomeFilter.fighter
  );
  const fighterStat = getWinsAndLosses(ufcData, fighterName);
  return (
    <Grid container>
      <Card title="Nombre de matchs" value={ufcData.length} />

      <Card title="Nombre de pertes" value={fighterStat.losses} />

      <Card title="Nombre de victoire" value={fighterStat.wins} />

      <Card
        title="Nombre de victoire par KO "
        value={fighterStat.win_by_KO_TKO}
      />

      <Card
        title="  Nombre de victoire par sumission"
        value={fighterStat.win_by_Submission}
      />
      <Grid item xs={6}>
        <RepartitionDesCoups />
      </Grid>
    </Grid>
  );
}
