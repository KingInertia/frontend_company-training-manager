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

export const logoutUser = async userToken => {
  try {
    const config = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
    await axiosInstance.post('/api/v1/auth/token/logout/', null, config);
  } catch (error) {
    throw error;
  }
};
