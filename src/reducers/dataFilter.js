import {
  UFC_DATA_FILTER_DATE,
  UFC_DATA_FILTER_FIGHTER,
  UFC_DATA_FILTER_LOCATION,
  UFC_RESET_FILTER,
} from '../constants';

const DATA = {
  location: null,
  date: {
    year: null,
    month: null,
  },
  fighter: null,
};

export default function reducer(data = DATA, { type, payload }) {
  switch (type) {
    case UFC_RESET_FILTER:
      return DATA;

    case UFC_DATA_FILTER_LOCATION:
      if (payload === data.location) return data;
      return { ...data, location: payload };

    case UFC_DATA_FILTER_FIGHTER:
      if (payload === data.fighter) return data;
      return { ...data, fighter: payload };

    case UFC_DATA_FILTER_DATE: {
      const { year, month } = payload;
      if (year === data.date.year && month === data.date.month) return data;
      return { ...data, date: { year, month } };
    }
    default:
      return data;
  }
}
