import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentCompany,
  updateCurrentCompany,
  getCompaniesList,
  getMyCompaniesList,
  getUserMembershipCompanies,
  createNewCompany,
} from './companiesActions';

const initialState = {
  companies: [],
  userMembershipCompanies: [],
  myCompanies: [],
  currentCompany: null,
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getCurrentCompany.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentCompany.fulfilled, (state, { payload }) => {
        state.currentCompany = payload;
        state.loading = false;
      })
      .addCase(getCurrentCompany.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getUserMembershipCompanies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserMembershipCompanies.fulfilled, (state, { payload }) => {
        state.userMembershipCompanies = payload;
        state.loading = false;
      })
      .addCase(getUserMembershipCompanies.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getCompaniesList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompaniesList.fulfilled, (state, { payload }) => {
        state.companies = payload;
        state.loading = false;
      })
      .addCase(getCompaniesList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getMyCompaniesList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyCompaniesList.fulfilled, (state, { payload }) => {
        state.myCompanies = payload;
        state.loading = false;
      })
      .addCase(getMyCompaniesList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createNewCompany.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createNewCompany.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(updateCurrentCompany.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentCompany = payload;
      })
      .addCase(updateCurrentCompany.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default companiesSlice.reducer;
