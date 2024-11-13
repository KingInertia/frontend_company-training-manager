import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authActions';

const initialState = {
  loading: false,
  userInfo: {},
  userToken: localStorage.getItem('userToken') || null,
  error: null,
  success: false,
  tokenTimestamp: localStorage.getItem('tokenTimestamp') || null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('tokenTimestamp');
      state.userInfo = null;
      state.loading = false;
      state.userToken = null;
      state.success = false;
      state.tokenTimestamp = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
        state.success = true;
        localStorage.setItem('userToken', payload.userToken);
        state.tokenTimestamp = Date.now();
        localStorage.setItem('tokenTimestamp', Date.now());
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
