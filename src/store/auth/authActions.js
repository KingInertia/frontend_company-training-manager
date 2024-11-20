import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const registerUser = async ({ username, email, password }) => {
  try {
    await axiosInstance.post('/api/v1/auth/users/', {
      username,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async authToken => {
  try {
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    };
    await axiosInstance.post('/api/v1/auth/token/logout/', null, config);
  } catch (error) {
    throw error;
  }
};
