import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from './userProfileActions';

const initialState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.pending, state => {
        state.success = false;
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.success = true;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userProfileSlice.reducer;
