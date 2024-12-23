import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const URL = '/api/v1/notifications/';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
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

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async ({ notification_id }, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`${URL}mark-as-read/`, null, {
        params: { notification_id },
      });
      return notification_id;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
