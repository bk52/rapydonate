import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignIn } from '../api/auth';

const initialState = {
    login: false,
    token: '',
    value: 0
};

export const fetchSignIn = createAsyncThunk(
    'auth/fetchSignIn',
    async (payload) => {
        const { username, password } = payload;
        console.log(`${username}:${password}`);
        const response = await SignIn(username, password)
        return response.data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.fulfilled, (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        })
        builder.addCase(fetchSignIn.rejected, (state, action) => { })
    },
});
export const selectLogin = (state) => state.login.value;
export const { signOut } = authSlice.actions;
export default authSlice.reducer;