import { configureStore } from '@reduxjs/toolkit';
import { banksReducer } from './slices/banks';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        banks: banksReducer,
        auth: authReducer
    },
});

export default store;
