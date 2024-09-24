import { configureStore } from '@reduxjs/toolkit';
import slidesReducer from './slidesSlice';

export const store = configureStore({
    reducer: {
        slides: slidesReducer,
    },
});
