import { createSlice } from '@reduxjs/toolkit';
import { getCompanyMembers } from './companyMembersActions';

const initialState = {
  currentCompanyMembers: [],
  loading: false,
  error: null,
};

const companyMembersSlice = createSlice({
  name: 'companyMembers',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getCompanyMembers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyMembers.fulfilled, (state, { payload }) => {
        state.currentCompanyMembers = payload;
        state.loading = false;
      })
      .addCase(getCompanyMembers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default companyMembersSlice.reducer;
