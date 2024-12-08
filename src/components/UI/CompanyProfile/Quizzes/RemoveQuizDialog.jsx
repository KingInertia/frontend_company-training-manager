import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';
import { useDispatch } from 'react-redux';
import { removeQuiz } from '../../../../store/companies/quizzes/quizzesActions';

const RemoveQuizDialog = ({ quiz, handleClose, open }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      await removeQuiz({
        id: quiz.id,
      });
      dispatch(setSnackbarMessage(t('RemoveQuizDialog.QuizRemoved')));
      handleClose();
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('RemoveQuizDialog.RemoveCurrentQuiz')}</DialogTitle>
        <DialogContent sx={{ width: '300px' }}>
          <Typography>{quiz.title}</Typography>
        </DialogContent>
        {loading ? (
          <Typography>{t('RemoveQuizDialog.RemovingQuiz')}</Typography>
        ) : (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t('RemoveQuizDialog.Cancel')}{' '}
            </Button>
            <Button onClick={handleRemove} color="error">
              {t('RemoveQuizDialog.RemoveQuiz')}{' '}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default RemoveQuizDialog;
