import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchBanks = createAsyncThunk('posts/fetchBanks', async () => {
    const { data } = await axios.get('/banks');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemoveBank = createAsyncThunk(
    'posts/fetchRemoveBank',
    async (id) => await axios.delete(`/banks/${id}`),
);

export const fetchBanksByTags = createAsyncThunk('posts/fetchBanksByTags', async (tags) => {
    const { data } = await axios.get('/banks', { params: { tags } });
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
            })
            .addCase(fetchTags.pending, (state) => {
                state.tags.items = [];
                state.tags.status = 'loading';
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload;
                state.tags.status = 'loaded';
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = [];
                state.tags.status = 'error';
            })
            .addCase(fetchRemoveBank.pending, (state, action) => {
                state.banks.items = state.banks.items.filter((obj) => obj._id !== action.meta.arg);
            })
            .addCase(fetchBanksByTags.pending, (state) => {
                state.banks.items = [];
                state.banks.status = 'loading';
            })
            .addCase(fetchBanksByTags.fulfilled, (state, action) => {
                state.banks.items = action.payload;
                state.banks.status = 'loaded';
            })
            .addCase(fetchBanksByTags.rejected, (state) => {
                state.banks.items = [];
                state.banks.status = 'error';
            });
    },
});

export const banksReducer = banksSlice.reducer;
