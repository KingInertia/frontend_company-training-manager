import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: null,
  tokenTimestamp: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload.authToken;
      state.tokenTimestamp = action.payload.tokenTimestamp;
    },
    removeAuthToken: state => {
      state.authToken = null;
      state.tokenTimestamp = null;
    },
  },
});

export default authSlice.reducer;
export const { setAuthToken, removeAuthToken } = authSlice.actions;
