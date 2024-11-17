import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/api/v1/auth/users/', {
        username,
        email,
        password,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/api/v1/auth/token/login/', {
        username,
        password,
      });
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

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async ({ userToken }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };
      await axiosInstance.post('/api/v1/auth/token/logout/', null, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
