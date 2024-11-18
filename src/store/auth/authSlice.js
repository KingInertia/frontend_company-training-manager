import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authActions';

const initialState = {
  userToken: null,
  tokenTimestamp: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
      state.tokenTimestamp = action.payload.tokenTimestamp;
    },
    removeUserToken: state => {
      state.userToken = null;
      state.tokenTimestamp = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

export default authSlice.reducer;
export const { setUserToken, removeUserToken } = authSlice.actions;
