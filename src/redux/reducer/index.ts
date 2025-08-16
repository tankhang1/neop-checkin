import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../slices/AppSlice';
const rootReducer = combineReducers({
  app: appReducer,
  // Add your reducers here
});

export default rootReducer;
