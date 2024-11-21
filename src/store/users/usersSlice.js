import { createSlice } from '@reduxjs/toolkit';
import { getUsersList, getCurrentUser } from './users.actions';

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
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
