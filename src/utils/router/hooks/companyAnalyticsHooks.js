import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const useGetAnalytics = () => {
  const dispatch = useDispatch();
  return useCallback(
    async ({ company_id, user_id }) => {
      const params = { company_id };

      if (user_id) params.user_id = user_id;

      try {
        const { data } = await axiosInstance.get(
          `${URL}company-dynamic-scores/`,
          {
            params: params,
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
