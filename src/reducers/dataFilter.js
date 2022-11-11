import {
  UFC_DATA_FILTER_DATE,
  UFC_DATA_FILTER_FIGHTER,
  UFC_DATA_FILTER_LOCATION,
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
    case UFC_DATA_FILTER_LOCATION:
      return { ...data, location: payload };

    case UFC_DATA_FILTER_FIGHTER:
      return { ...data, fighter: payload };

    case UFC_DATA_FILTER_DATE: {
      const { year, month } = payload;
      return { ...data, date: { year, month } };
    }

    default:
      return data;
  }
}
