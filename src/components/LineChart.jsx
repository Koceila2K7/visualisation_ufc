import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { months, UFC_DATA_FILTER_DATE } from '../constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export default function LineChart() {
  const { ufcData, allYears, monthsPeerYear } = useSelector(
    (globalState) => globalState.ufcReducer
  );
  const { year, month } = useSelector(
    (globalState) => globalState.ufcHomeFilter.date
  );
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  function handleDateFilter(e) {
    dispatch({
      type: UFC_DATA_FILTER_DATE,
      payload: { year: e.target.value === 'Tout' ? null : e.target.value },
    });
  }
  function handleDateFilterMonth(e) {
    dispatch({
      type: UFC_DATA_FILTER_DATE,
      payload: {
        year,
        month: e.target.value === 'Tout' ? null : e.target.value,
      },
    });
  }
  const ufcDataDate = ufcData.map((e) => {
    const [y, m, d] = e.date.split('-');
    return {
      d,
      m,
      y,
    };
  });
  const dateMatches = d3.rollup(
    ufcDataDate,
    (g) => g.length,
    // eslint-disable-next-line no-nested-ternary
    (d) => (year == null ? d.y : month == null ? d.m : d.d)
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'end',
      }}
    >
      <div>
        {year !== null && (
          <FormControl>
            <InputLabel id="demo-simple-select-label">Mois</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month == null ? 'Tout' : month}
              label="Mois"
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleDateFilterMonth}
            >
              {['Tout', ...monthsPeerYear.get(year)].map((v) => (
                <MenuItem key={v} value={v}>
                  {months[v]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Années</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year == null ? 'Tout' : year}
            label="Années"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={handleDateFilter}
          >
            {['Tout', ...allYears].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ flex: 2, width: '100%' }}>
        <Line
          options={options}
          data={{
            labels:
              year == null || (year !== null && month !== null)
                ? Array.from(dateMatches.keys())
                : Array.from(dateMatches.keys()).map((e) => months[e]),
            datasets: [
              {
                label:
                  // eslint-disable-next-line no-nested-ternary
                  year == null
                    ? 'Nombre de matchs par années'
                    : month == null
                    ? `Nombre de matchs par mois pour l'année ${year}`
                    : `Nombre de matchs par jours, ${months[month]}  ${year} `,
                data: Array.from(dateMatches.values()),
                borderColor: '#D20A0A',
                backgroundColor: '#D20A0A',
                hidden: false,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
