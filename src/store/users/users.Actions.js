import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getUsersList = createAsyncThunk(
  'users/usersList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/api/v1/users/');
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/users/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
