import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentCompany,
  updateCurrentCompany,
  getCompaniesList,
} from './companiesActions';

const initialState = {
  companies: [],
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
