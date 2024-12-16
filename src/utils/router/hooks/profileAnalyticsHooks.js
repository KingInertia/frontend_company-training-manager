import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const useGetRating = () => {
  const dispatch = useDispatch();
  return useCallback(
    async ({ user_id }) => {
      try {
        const { data } = await axiosInstance.get(`${URL}user-rating/`, {
          params: { user_id },
        });
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

export const useGetUserAnalytics = () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`${URL}user-dynamic-scores/`);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));

      return null;
    }
  }, [dispatch]);
};
