import * as d3 from 'd3';
import { UFC_FILTER_DATA } from '../constants';
import ufcData from '../data/data.json';
import location from '../data/locations.json';

const allAthletsNames = Array.from(
  new Set([
    ...ufcData.data.map((r) => r.R_fighter),
    ...ufcData.data.map((r) => r.B_fighter),
  ])
).filter(
  (e) =>
    !e.B_fighter?.contains('Cheyanne Buys') &&
    !e.R_fighter?.contains('Cheyanne Buys')
);

const monthsPeerYear = d3.rollup(
  ufcData.data.map((e) => {
    const [y, m, d] = e.date.split('-');
    return {
      d,
      m,
      y,
    };
  }),
  (g) => new Set(g.map((e) => e.m)),
  // eslint-disable-next-line no-nested-ternary
  (d) => d.y
);

const allYears = new Set(ufcData.data.map((e) => e.date.split('-')[0]));
const DATA = {
  ufcData: ufcData.data,
  location,
  allAthletsNames,

  allYears,
  monthsPeerYear,
};

function dataFilterFunction({
  location: locationFilter,
  date: { month, year },
  fighter,
  pays,
}) {
  function filterCallback(e) {
    let result = true;
    if (locationFilter !== null) {
      result = result && e.location === locationFilter;
    }
    if (pays !== null) {
      result = result && e.pays === pays;
    }
    if (fighter !== null) {
      result = result && (e.B_fighter === fighter || e.R_fighter === fighter);
    }
    if (year !== null || month !== null) {
      // eslint-disable-next-line no-unused-vars
      const [y, m, _] = e.date.split('-');
      if (month === null) {
        result = result && y === year;
      } else {
        result = result && y === year && m === month;
      }
    }
    return result;
  }
  return filterCallback;
}

// eslint-disable-next-line no-unused-vars
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

export default function reducer(data = DATA, { type, payload }) {
  switch (type) {
    case UFC_FILTER_DATA: {
      const newData = ufcData.data.filter(dataFilterFunction(payload));

      return {
        ufcData: newData,
        location,
        allAthletsNames,
        allYears,
        monthsPeerYear,
      };
    }
    default:
      return data;
  }
}
