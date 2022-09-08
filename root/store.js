import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './reducers/calendarReducer';

const store = configureStore({ reducer: calendarReducer })

export default store;