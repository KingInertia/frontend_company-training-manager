import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import { analitycStates } from '../../constants/companyConst';
import { format } from 'date-fns';
import axiosInstance from '../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const useFetchCompanyScores = () => {
  const dispatch = useDispatch();
  return useCallback(
    async ({ company_id, user_id }) => {
      const params = { company_id };
      if (user_id) params.user_id = user_id;

      try {
        const { data } = await axiosInstance.get(
          `${URL}users-dynamic-scores/`,
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

export const useStatisticData = (analyticsType, t) => {
  const createStatisticData = useCallback(
    data => {
      const allDates = [];
      data.forEach(statistic_obj => {
        statistic_obj.scores.forEach(item => {
          const date = format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss');
          if (!allDates.includes(date)) {
            allDates.push(date);
          }
        });
      });

      allDates.sort((a, b) => new Date(a) - new Date(b));

      const datasets = data.map(statistic_obj => {
        const statisticData = allDates.map(date => {
          const entry = statistic_obj.scores.find(
            item => format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss') === date,
          );

          return entry ? entry.score : null;
        });

        return {
          label:
            analyticsType === analitycStates.USERS
              ? t('AnalyticsModal.User') + ` ${statistic_obj.id}`
              : t('AnalyticsModal.Quiz') + ` ${statistic_obj.id}`,
          data: statisticData,
          customId: statistic_obj.id,
        };
      });

      return {
        labels: allDates,
        datasets,
      };
    },
    [analyticsType, t],
  );

  return createStatisticData;
};

export default useStatisticData;
