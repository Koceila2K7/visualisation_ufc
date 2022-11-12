import { UFC_FILTER_DATA } from '../constants';
import ufcData from '../data/data.json';
import location from '../data/locations.json';

const DATA = { ufcData: ufcData.data, location };

export default function reducer(data = DATA, { type, payload }) {
  switch (type) {
    case UFC_FILTER_DATA: {
      let newData = [...ufcData.data];

      const {
        location: locationFilter,
        date: { month, year },
        fighter,
      } = payload;

      newData = newData.filter((e) => {
        let result = true;
        if (locationFilter !== null) {
          result = result && e.location === locationFilter;
        }
        if (fighter !== null) {
          result =
            result && (e.B_fighter === fighter || e.R_fighter === fighter);
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
      });

      return { ufcData: newData, location };
    }
    default:
      return data;
  }
}
