import {
  UFC_DATA_FILTER_DATE,
  UFC_DATA_FILTER_FIGHTER,
  UFC_DATA_FILTER_LOCATION,
  UFC_DATA_FILTER_PAYS,
  UFC_RESET_FILTER,
  UFC_SET_FIGHTER_B,
  UFC_SET_FIGHTER_R,
} from '../constants';

const DATA = {
  location: null,
  date: {
    year: null,
    month: null,
  },
  fighter: null,

  fighterR: null,
  fighterB: null,

  pays: null,
};

export default function reducer(data = DATA, { type, payload }) {
  switch (type) {
    case UFC_RESET_FILTER:
      return DATA;

    case UFC_DATA_FILTER_LOCATION:
      if (payload === data.location) return data;
      return { ...data, location: payload };

    case UFC_DATA_FILTER_PAYS:
      return payload === data.pays ? data : { ...data, pays: payload };
    case UFC_DATA_FILTER_FIGHTER:
      if (payload === data.fighter) return data;
      return { ...data, fighter: payload };

    case UFC_DATA_FILTER_DATE: {
      const { year = null, month = null } = payload;
      if (year === data.date.year && month === data.date.month) return data;
      return { ...data, date: { year, month } };
    }

    case UFC_SET_FIGHTER_B: {
      return payload === data.fighterB ? data : { ...data, fighterB: payload };
    }

    case UFC_SET_FIGHTER_R: {
      return payload === data.fighterR ? data : { ...data, fighterR: payload };
    }

    default:
      return data;
  }
}
