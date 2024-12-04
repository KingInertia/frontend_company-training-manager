import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/invitations/';

export const sentInvitationsList = createAsyncThunk(
  'companies/sentInvitationsList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(URL);
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const receivedInvitationsList = createAsyncThunk(
  'invitations/receivedInvitationsList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}user-invitations/`);
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const sendInvitation = createAsyncThunk(
  'invitations/createInvitation',
  async ({ receiver, company }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(URL, {
        receiver,
        company,
      });
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const makeInvitationDecision = async ({ invitationId, decision }) => {
  try {
    await axiosInstance.patch(`${URL}${invitationId}/${decision}/`);
  } catch (error) {
    throw error;
  }
};
