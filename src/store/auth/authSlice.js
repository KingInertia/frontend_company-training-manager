import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  tokenExpirationTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.tokenExpirationTime = action.payload.tokenExpirationTime;
    },
    logout: state => {
      state.refreshToken = null;
      state.accessToken = null;
      state.tokenExpirationTime = null;
    },
  },
});

export default authSlice.reducer;
export const { setAuthToken, logout } = authSlice.actions;
