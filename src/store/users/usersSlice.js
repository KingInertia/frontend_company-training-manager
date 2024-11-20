import { createSlice } from '@reduxjs/toolkit';
import { getUsersList } from './users.Actions';

const initialState = {
  users: [],
  loading: false,
  error: null,
  user: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersList.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })
      .addCase(getUsersList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default usersSlice.reducer;
