import { createSlice } from '@reduxjs/toolkit';
import { getUser } from './users.Actions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
