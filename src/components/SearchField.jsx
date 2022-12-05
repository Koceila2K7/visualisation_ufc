/* eslint-disable react/destructuring-assignment */
import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';

function RenderInput(params) {
  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...params}
      label="Nom du combatant"
      InputProps={{
        // eslint-disable-next-line react/jsx-props-no-spreading
        ...params.InputProps,
        type: 'search',
      }}
    />
  );
}

export default function SearchField({ onChange, value }) {
  const allAthletsNames = useSelector(
    (globalState) => globalState.ufcReducer.allAthletsNames
  );
  const handleClick = useCallback(
    (event) => onChange(event.target.innerText),

    []
  );
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={handleClick}
        options={allAthletsNames}
        renderInput={RenderInput}
        value={value}
      />
    </Stack>
  );
}
