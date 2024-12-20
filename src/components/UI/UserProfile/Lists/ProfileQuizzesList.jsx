import React from 'react';
import TableList from '../../TableList';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../../api/axiosInstance';
import UserExportDialog from '../UserExportDialog';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';

const ProfileQuizzesList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [userResults, setUserResults] = useState(true);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [quizId, setQuizId] = useState();

  const rowNames = [
    t('ProfileQuizzesList.Quiz'),
    t('ProfileQuizzesList.Date'),
    t('ProfileQuizzesList.QuizTitle'),
    t('ProfileQuizzesList.CorrectAnswer'),
    t('ProfileQuizzesList.TotalQuestions'),
  ];

  useEffect(() => {
    const fetchUserResults = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          '/api/v1/quizzes/user-last-completions/',
        );
        setUserResults(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          dispatch(
            setSnackbarMessage(Object.values(error.response.data).join(' ')),
          );
        } else {
          dispatch(setSnackbarMessage(error.message));
        }
        setLoading(false);
      }
    };

    fetchUserResults();
  }, [dispatch]);

  const handleOpenExportDialog = id => {
    setQuizId(id);
    setOpenExportDialog(true);
  };

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        userResults.length > 0 && (
          <TableList
            headTextSize="h7"
            rowNames={rowNames}
            list={userResults}
            onClick={handleOpenExportDialog}
          />
        )
      )}
      <UserExportDialog
        quizId={quizId}
        handleClose={() => setOpenExportDialog(false)}
        open={openExportDialog}
      />
    </>
  );
};

export default ProfileQuizzesList;
