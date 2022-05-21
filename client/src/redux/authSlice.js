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
            state.login = false;
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.fulfilled, (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            if (accessToken && refreshToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                state.login = true;
            }
        })
        builder.addCase(fetchSignIn.rejected, (state, action) => { })
    },
});
export const selectLogin = (state) => state.auth.login;
export const { signOut, setLogin } = authSlice.actions;
export default authSlice.reducer;