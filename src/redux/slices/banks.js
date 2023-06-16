import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchBanks = createAsyncThunk('posts/fetchBanks', async () => {
    const { data } = await axios.get('/banks');
    return data;
});

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
    extraReducers: (builder) => {
        builder
          .addCase(fetchBanks.pending, (state) => {
            state.banks.items = [];
            state.banks.status = 'loading';
          })
          .addCase(fetchBanks.fulfilled, (state, action) => {
            state.banks.items = action.payload;
            state.banks.status = 'loaded';
          })
          .addCase(fetchBanks.rejected, (state) => {
            state.banks.items = [];
            state.banks.status = 'error';
          });
      },
});

export const banksReducer = banksSlice.reducer;
