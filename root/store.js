import { combineReducers, configureStore } from '@reduxjs/toolkit';
import calendarReducer from './reducers/calendarReducer';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
    calendar: calendarReducer,
    user: userReducer
})

const store = configureStore({ reducer: rootReducer })

export default store;