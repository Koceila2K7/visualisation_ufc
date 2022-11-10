import { combineReducers } from '@reduxjs/toolkit';
import ufcReducer from './ufc';

const combinedReducers = combineReducers({
  ufcReducer,
});

export default combinedReducers;
