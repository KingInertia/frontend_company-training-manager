import { createSlice } from '@reduxjs/toolkit';
import {
  sentRequestsList,
  receivedRequestsList,
  sendRequest,
} from './requestsActions';

const initialState = {
  receivedRequests: [],
  sentRequests: [],
  loading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(sentRequestsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sentRequestsList.fulfilled, (state, { payload }) => {
        state.sentRequests = payload;
        state.loading = false;
      })
      .addCase(sentRequestsList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(receivedRequestsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(receivedRequestsList.fulfilled, (state, { payload }) => {
        state.receivedRequests = payload;
        state.loading = false;
      })
      .addCase(receivedRequestsList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(sendRequest.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendRequest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendRequest.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default requestsSlice.reducer;
