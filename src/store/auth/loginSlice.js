import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './authActions';

const initialState = {
  loading: false,
  userToken: localStorage.getItem('userToken') || null,
  error: null,
  success: false,
  tokenTimestamp: localStorage.getItem('tokenTimestamp') || null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenTimestamp');
        state.userToken = null;
        state.tokenTimestamp = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.auth_token;
        state.success = true;
        localStorage.setItem('userToken', payload.auth_token);
        state.tokenTimestamp = Date.now();
        localStorage.setItem('tokenTimestamp', Date.now());
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logoutUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.userToken = null;
        state.tokenTimestamp = null;
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenTimestamp');
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      });
  },
});
export default loginSlice.reducer;
