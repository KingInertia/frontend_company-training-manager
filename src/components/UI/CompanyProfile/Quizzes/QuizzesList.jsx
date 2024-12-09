import TableList from '../../TableList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getCompanyQuizzes } from '../../../../store/companies/quizzes/quizzesActions';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';
import { selectQuizzes } from '../../../../store/companies/quizzes/quizzesSelectors';
import RemoveQuizDialog from './RemoveQuizDialog';
import EditQuizModal from './EditQuizModal';
import { manageStates, listStates } from '../../../../constants/companyConst';

const QuizzesList = ({ companyId, manageState, listState }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openEditQuizDialog, setOpenEditQuizDialog] = useState(false);
  const [quizForManage, setQuizForManage] = useState({});
  const { error, companyQuizzes } = useSelector(selectQuizzes);
  const rowNames = [];

  const clearList = quizzes => {
    if (!quizzes) return [];
    return quizzes.map(quiz => ({ id: quiz.id, title: quiz.title }));
  };

  const cleanQuizzesList = useMemo(
    () => clearList(companyQuizzes),
    [companyQuizzes],
  );

  useEffect(() => {
    dispatch(getCompanyQuizzes({ companyId }));
  }, [dispatch, companyId]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  const handleQuizControl = id => {
    if (companyQuizzes) {
      const quiz = companyQuizzes.find(quiz => quiz.id === id);

      if (manageState === manageStates.REMOVE_QUIZ) {
        setQuizForManage(quiz);
        setOpenRemoveDialog(true);
      } else if (manageState === manageStates.EDIT_QUIZ) {
        setQuizForManage(quiz);
        setOpenEditQuizDialog(true);
      }
    }
  };

  const handleCloseRemoveDiag = () => {
    setOpenRemoveDialog(false);
  };

  return (
    <>
      {listState === listStates.QUIZZES && (
        <>
          <Box
            sx={{
              backgroundColor:
                manageState === manageStates.REMOVE_QUIZ
                  ? '#9e2a2f'
                  : manageState === manageStates.EDIT_QUIZ
                    ? '#738f45'
                    : '#e08e45',
              padding: '8px',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
              {manageState === manageStates.REMOVE_QUIZ &&
                t('QuizzesList.SelectQuizToRemove')}
              {manageState === manageStates.EDIT_QUIZ &&
                t('QuizzesList.SelectQuizToEdit')}
              {!manageState && t('QuizzesList.Quizzes')}
            </Typography>
          </Box>
          {!cleanQuizzesList ? (
            <Typography>Loading...</Typography>
          ) : (
            cleanQuizzesList.length > 0 && (
              <TableList
                rowNames={rowNames}
                list={cleanQuizzesList}
                onClick={handleQuizControl}
              />
            )
          )}
          <RemoveQuizDialog
            quiz={quizForManage}
            handleClose={handleCloseRemoveDiag}
            open={openRemoveDialog}
          />
          <EditQuizModal
            onClose={() => setOpenEditQuizDialog(false)}
            open={openEditQuizDialog}
            quiz={quizForManage}
          />
        </>
      )}
    </>
  );
};

export default QuizzesList;
