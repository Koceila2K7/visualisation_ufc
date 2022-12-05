/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchField from '../../components/SearchField';
import { UFC_FILTER_DATA } from '../../constants';
import FighterStats from '../../components/FighterStats';
// eslint-disable-next-line no-unused-vars
import ufcData from '../../data/data.json';

function dataFilterFighterFunction(fighter) {
  function filterCallback(e) {
    let result = true;

    if (fighter !== null) {
      result = result && (e.B_fighter === fighter || e.R_fighter === fighter);
    }

    return result;
  }
  return filterCallback;
}
export default function Athletes() {
  const dispatch = useDispatch();
  const dataFilter = useSelector((globalState) => globalState.ufcHomeFilter);

  const [selectedFighters, setFighters] = useState({
    fighterB: 'Jairzinho Rozenstruik',
    fighterR: 'Charles Jourdain',
  });

  const [matchs, setMatchs] = useState({
    fighterB: ufcData.data.filter(
      dataFilterFighterFunction(selectedFighters.fighterB)
    ),
    fighterR: ufcData.data.filter(
      dataFilterFighterFunction(selectedFighters.fighterR)
    ),
  });

  useEffect(() => {
    setMatchs(() => ({
      fighterB: ufcData.data.filter(
        dataFilterFighterFunction(selectedFighters.fighterB)
      ),
      fighterR: ufcData.data.filter(
        dataFilterFighterFunction(selectedFighters.fighterR)
      ),
    }));
  }, [selectedFighters]);
  function setFighterR(fighterR) {
    return setFighters((old) => ({ ...old, fighterR }));
  }
  function setFighterB(fighterB) {
    return setFighters((old) => ({ ...old, fighterB }));
  }

  useEffect(() => {
    dispatch({ type: UFC_FILTER_DATA, payload: dataFilter });
  }, [dataFilter]);

  return (
    <Container style={{ padding: 4, marginTop: 70 }}>
      <Grid container>
        <Grid
          item
          xs={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#D20A0A',
              width: '50px',
              height: '30px',
            }}
          />
          <SearchField
            onChange={setFighterR}
            value={selectedFighters.fighterR}
          />
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SearchField
            onChange={setFighterB}
            value={selectedFighters.fighterB}
          />

          <div
            style={{
              backgroundColor: 'rgba(59,  78, 196,1)',
              width: '50px',
              height: '30px',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FighterStats
            fighterNameR={selectedFighters.fighterR}
            fighterNameB={selectedFighters.fighterB}
            fighterB={matchs.fighterB}
            fighterR={matchs.fighterR}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
