import { combineReducers } from '@reduxjs/toolkit';
import ufcReducer from './ufc';
import ufcHomeFilter from './dataFilter';

const combinedReducers = combineReducers({
  ufcReducer,
  ufcHomeFilter,
});

export default combinedReducers;
