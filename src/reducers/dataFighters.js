import * as d3 from 'd3';
import { UFC_FILTER_DATA } from '../constants';
import ufcData from '../data/data.json';
import location from '../data/locations.json';

const allAthletsNames = Array.from(
  new Set([
    ...ufcData.data.map((r) => r.R_fighter),
    ...ufcData.data.map((r) => r.B_fighter),
  ])
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

  ufcR: ufcData.data,
  ufcB: ufcData.data,
};

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
    case `${UFC_FILTER_DATA}7`: {
      const { fighterR, fighterB } = payload;

      const ufcB = ufcData.data.filter(dataFilterFighterFunction(fighterB));
      const ufcR = ufcData.data.filter(dataFilterFighterFunction(fighterR));

      return {
        ufcB,
        ufcR,
      };
    }
    default:
      return data;
  }
}
