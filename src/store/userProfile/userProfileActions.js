import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getUserProfile = createAsyncThunk(
  'userProfile/getUserProfile',
  async ({ authToken }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        '/api/v1/auth/users/me/',
        config,
      );
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

export const delUserProfile = createAsyncThunk(
  'userProfile/deleteUserProfile',
  async ({ userToken, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
        data: {
          current_password: password,
        },
      };
      await axiosInstance.delete('/api/v1/auth/users/me/', config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
