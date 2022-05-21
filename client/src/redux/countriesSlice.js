import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetCountries from '../api/countries';

const initialState = {
    countries: [],
};

export const fetchCountries = createAsyncThunk(
    'country/fetchCountries',
    async () => {
        const response = await GetCountries()
        return response.data
    }
)

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.countries = action.payload.data
        })
        builder.addCase(fetchCountries.rejected, (state, action) => { })
    },
});
export const selectCountries = (state) => state.country.countries;
export default countrySlice.reducer;