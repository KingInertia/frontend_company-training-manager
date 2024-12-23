import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import axiosInstance from '../../api/axiosInstance';

const URL = '/api/v1/notifications/';

export const useMarkNotificationAsRead = () => {
  const dispatch = useDispatch();
  return useCallback(
    async notificationId => {
      try {
        const { data } = await axiosInstance.patch(
          `${URL}mark-as-read/`,
          null,
          {
            params: { id: notificationId },
          },
        );
        return data;
      } catch (error) {
        const errorMessage = error.response
          ? Object.values(error.response.data).join(' ')
          : error.message;
        dispatch(setSnackbarMessage(errorMessage));

        return null;
      }
    },
    [dispatch],
  );
};
