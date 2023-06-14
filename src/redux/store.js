import { configureStore } from '@reduxjs/toolkit';
import { banksReducer } from './slices/banks';

const store = configureStore({
    reducer: {
        banks: banksReducer
    },
});

export default store;
