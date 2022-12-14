/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFighterStats, getWinsAndLosses } from '../utils';
import RadarStats from './RadarStats';
import RepartitionDesCoups from './RepartitionDesCoups';
import StrikingStats from './StrikingStats';
import VictoireBar from './VictoireBar';

// eslint-disable-next-line no-unused-vars
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

export default function FighterStats({
  fighterB,
  fighterR,
  fighterNameR,
  fighterNameB,
}) {
  // eslint-disable-next-line no-unused-vars
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);

  const fighterStatR = getWinsAndLosses(fighterR, fighterNameR);
  const statsR = getFighterStats(fighterR, fighterNameR);

  const fighterStatB = getWinsAndLosses(fighterB, fighterNameB);
  const statsB = getFighterStats(fighterB, fighterNameB);

  return (
    <Grid container>
      <Grid item xs={4} style={{ padding: 60, paddingTop: 2 }}>
        <RepartitionDesCoups stats={statsR} />
      </Grid>

      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VictoireBar
          labels={[fighterNameR, fighterNameB]}
          pertes={[fighterStatR.losses, fighterStatB.losses]}
          victoire={[fighterStatR.wins, fighterStatB.wins]}
        />
      </Grid>

      <Grid item xs={4} style={{ padding: 60, paddingTop: 2 }}>
        <RepartitionDesCoups stats={statsB} color="rgb(59,  78, 196)" />
      </Grid>

      <Grid item xs={3}>
        <StrikingStats {...statsR} name={fighterNameR} />
      </Grid>
      <Grid item xs={6}>
        <RadarStats
          statsR={statsR}
          statsB={statsB}
          fighterNameB={fighterNameB}
          fighterNameR={fighterNameR}
        />
      </Grid>

      <Grid item xs={3}>
        <StrikingStats {...statsB} name={fighterNameB} />
      </Grid>
    </Grid>
  );
}
