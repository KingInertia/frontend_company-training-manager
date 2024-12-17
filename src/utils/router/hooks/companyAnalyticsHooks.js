import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const useFetchCompanyScores = () => {
  const dispatch = useDispatch();
  return useCallback(
    async ({ company_id }) => {
      try {
        const { data } = await axiosInstance.get(
          `${URL}users-dynamic-scores/`,
          {
            params: { company_id },
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

export const useFetchUserScores = () => {
  const dispatch = useDispatch();
  return useCallback(
    async ({ company_id, user_id }) => {
      try {
        const { data } = await axiosInstance.get(`${URL}user-dynamic-scores/`, {
          params: { company_id, user_id },
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
