import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchField from '../../components/SearchField';
import Maps from '../../components/Maps';
import { UFC_FILTER_DATA } from '../../constants';
import FighterStats from '../../components/FighterStats';

export default function Athletes() {
  const dispatch = useDispatch();
  const dataFilter = useSelector((globalState) => globalState.ufcHomeFilter);

  useEffect(() => {
    dispatch({ type: UFC_FILTER_DATA, payload: dataFilter });
  }, [dataFilter]);

  return (
    <Container style={{ padding: 4, marginTop: 100 }}>
      <SearchField />
      <Grid container>
        <Grid item xs={12}>
          <FighterStats />
        </Grid>
        <Grid item xs={6}>
          <Maps />
        </Grid>
      </Grid>
    </Container>
  );
}
