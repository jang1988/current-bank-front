import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    banks: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const banksSlice = createSlice({
    name: 'banks',
    initialState,
    reducer: {},
});

export const banksReducer = banksSlice.reducer;
