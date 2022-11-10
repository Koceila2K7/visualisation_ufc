import ufcData from '../data/data.json';
import location from '../data/locations.json';

const DATA = { ufcData, location };

export default function reducer(data = DATA, action) {
  switch (action.type) {
    default:
      return data;
  }
}
