import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/requests/';

export const receivedRequestsList = createAsyncThunk(
  'requests/sentRequestsList',
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

export const sentRequestsList = createAsyncThunk(
  'requests/receivedRequestsList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}user-requests/`);
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

export const sendRequest = createAsyncThunk(
  'companyRequests/createRequest',
  async ({ company }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(URL, {
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

export const makeRequestDecision = async ({ requestId, decision }) => {
  try {
    await axiosInstance.patch(`${URL}${requestId}/${decision}/`);
  } catch (error) {
    throw error;
  }
};
