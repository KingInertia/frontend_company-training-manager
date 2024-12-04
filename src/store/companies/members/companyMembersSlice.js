import { createSlice } from '@reduxjs/toolkit';
import { getCompanyMembers, getCompanyAdmins } from './companyMembersActions';

const initialState = {
  currentCompanyMembers: [],
  currentCompanyAdmins: [],
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
      })
      .addCase(getCompanyAdmins.pending, state => {
        state.loading = true;
      })
      .addCase(getCompanyAdmins.fulfilled, (state, { payload }) => {
        state.currentCompanyAdmins = payload;
        state.loading = false;
      })
      .addCase(getCompanyAdmins.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export default companyMembersSlice.reducer;
