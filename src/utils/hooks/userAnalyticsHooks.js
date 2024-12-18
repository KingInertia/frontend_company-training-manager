import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import { format } from 'date-fns';
import axiosInstance from '../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const useFetchUserRating = () => {
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

export const useCurrentUserScores = () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        `${URL}current-user-dynamic-scores/`,
      );
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

export const useStatisticData = t => {
  return useCallback(
    data => {
      const allDates = [];

      data.forEach(item => {
        const date = format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss');
        if (!allDates.includes(date)) {
          allDates.push(date);
        }
      });

      const datasets = [
        {
          label: t('ProfileAnalyticsModal.QuizResults'),
          data: allDates.map(date => {
            const entry = data.find(
              item =>
                format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss') === date,
            );
            return entry ? entry.score : null;
          }),
        },
      ];

      return {
        labels: allDates,
        datasets: datasets,
      };
    },
    [t],
  );
};

export default useStatisticData;
