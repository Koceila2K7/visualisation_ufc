import { UFC_FILTER_DATA } from '../constants';
import ufcData from '../data/data.json';
import location from '../data/locations.json';

const allAthletsNames = Array.from(
  new Set([
    ...ufcData.data.map((r) => r.R_fighter),
    ...ufcData.data.map((r) => r.B_fighter),
  ])
);

const DATA = { ufcData: ufcData.data, location, allAthletsNames };

function dataFilterFunction({
  location: locationFilter,
  date: { month, year },
  fighter,
}) {
  function filterCallback(e) {
    let result = true;
    if (locationFilter !== null) {
      result = result && e.location === locationFilter;
    }
    if (fighter !== null) {
      result = result && (e.B_fighter === fighter || e.R_fighter === fighter);
    }
    if (year !== null || month !== null) {
      // eslint-disable-next-line no-unused-vars
      const [_, m, y] = e.date.split('-');
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

export default function reducer(data = DATA, { type, payload }) {
  switch (type) {
    case UFC_FILTER_DATA: {
      const newData = ufcData.data.filter(dataFilterFunction(payload));
      return { ufcData: newData, location, allAthletsNames };
    }
    default:
      return data;
  }
}
