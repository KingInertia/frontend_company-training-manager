import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getUserProfile = createAsyncThunk(
  'userProfile/getUserProfile',
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/api/v1/auth/users/me/');
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

export const delUserProfile = async ({ password }) => {
  try {
    const config = {
      data: {
        current_password: password,
      },
    };
    await axiosInstance.delete('/api/v1/auth/users/me/', config);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({ updatedFields }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axiosInstance.patch(
        '/api/v1/auth/users/me/',
        updatedFields,
        config,
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getAvatar = async imagePath => {
  try {
    const response = await axiosInstance.get(imagePath, {
      baseURL: '',
      responseType: 'blob',
    });
    const imageUrl = URL.createObjectURL(response.data);

    return imageUrl;
  } catch (error) {
    console.error('Ошибка при получении картинки:', error);
    return null;
  }
};
