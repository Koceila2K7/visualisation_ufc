import { UFC_FILTER_DATA } from '../constants';
import ufcData from '../data/data.json';
import location from '../data/locations.json';

const DATA = { ufcData, location, ufcDataHome: ufcData };

export default function reducer(data = DATA, { type, payload }) {
  switch (type) {
    case UFC_FILTER_DATA: {
      let newData = { ...ufcData };

      const {
        location: locationFilter,
        date: { month, year },
        fighter,
      } = payload;

      if (locationFilter !== null) {
        newData = newData.filter((e) => e.location === locationFilter);
      }

      if (fighter !== null) {
        newData = newData.filter(
          (e) => e.B_fighter === fighter || e.R_fighter === fighter
        );
      }

      if (year !== null || month !== null) {
        newData = newData.filter((r) => {
          // eslint-disable-next-line no-unused-vars
          const [_, m, y] = r.date.split('-');
          if (month === null) return y === year;
          return y === year && m === month;
        });
      }
      return newData;
    }
    default:
      return data;
  }
}
