import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        country: countriesReducer
    },
});
