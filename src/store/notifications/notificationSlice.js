import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  lastNotification: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.lastNotification = action.payload;
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        n => n.id === action.payload,
      );
      if (notification) {
        notification.status = 'read';
      }
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markNotificationAsRead,
  setWebSocket,
} = notificationSlice.actions;
export default notificationSlice.reducer;
