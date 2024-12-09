import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeQuiz } from '../../../../store/companies/quizzes/quizzesActions';
import { selectQuizzes } from '../../../../store/companies/quizzes/quizzesSelectors';

const RemoveQuizDialog = ({ quiz, handleClose, open }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(selectQuizzes);

  const handleRemove = () => {
    dispatch(removeQuiz({ id: quiz.id }));
    handleClose();
  };

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    } else if (success) {
      dispatch(setSnackbarMessage(t('RemoveQuizDialog.QuizRemoved')));
    }
  }, [error, success, dispatch, t]);

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
