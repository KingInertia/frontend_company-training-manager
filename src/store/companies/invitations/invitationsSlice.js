import { createSlice } from '@reduxjs/toolkit';
import {
  sentInvitationsList,
  receivedInvitationsList,
  sendInvitation,
} from './invitationsActions';

const initialState = {
  receivedInwitations: [],
  sentInvitations: [],
  loading: false,
  error: null,
  success: false,
};

const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(sentInvitationsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sentInvitationsList.fulfilled, (state, { payload }) => {
        state.sentInvitations = payload;
        state.loading = false;
      })
      .addCase(sentInvitationsList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(receivedInvitationsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(receivedInvitationsList.fulfilled, (state, { payload }) => {
        state.receivedInvitations = payload;
        state.loading = false;
      })
      .addCase(receivedInvitationsList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(sendInvitation.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendInvitation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendInvitation.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearError } = invitationsSlice.actions;

export default invitationsSlice.reducer;
