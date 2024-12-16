import React from 'react';
import TableList from '../../TableList';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserResults } from '../../../../store/companies/quizzes/quizzesActions';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';
import { selectQuizzes } from '../../../../store/companies/quizzes/quizzesSelectors';

const ProfileCompaniesList = ({ userId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { error, userResults } = useSelector(selectQuizzes);

  const rowNames = [
    t('ProfileQuizzesList.Quiz'),
    t('ProfileQuizzesList.Date'),
    t('ProfileQuizzesList.QuizTitle'),
    t('ProfileQuizzesList.CorrectAnswer'),
    t('ProfileQuizzesList.TotalQuestions'),
  ];

  useEffect(() => {
    dispatch(getUserResults());
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  return (
    <>
      {!userResults ? (
        <Typography>Loading...</Typography>
      ) : (
        userResults.length > 0 && (
          <TableList
            headTextSize="h7"
            rowNames={rowNames}
            list={userResults}
            navigateType="companies"
          />
        )
      )}
    </>
  );
};

export default ProfileCompaniesList;
