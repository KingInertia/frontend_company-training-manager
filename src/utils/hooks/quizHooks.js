import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import axiosInstance from '../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const useGetQuizInfo = () => {
  const dispatch = useDispatch();
  return useCallback(
    async quiz => {
      try {
        const { data } = await axiosInstance.get(`${URL}quiz-info/`, {
          params: { quiz },
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

export const useStartQuizSession = () => {
  const dispatch = useDispatch();

  return useCallback(
    async quiz => {
      try {
        const { data } = await axiosInstance.get(`${URL}start-quiz/`, {
          params: { quiz },
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

export const useFinishQuizSession = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (answers, session) => {
      try {
        const { data } = await axiosInstance.post(`${URL}finish-quiz/`, {
          answers,
          session,
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
