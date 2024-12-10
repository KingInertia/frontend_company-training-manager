import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import TextPage from '../UI/TextPage';
import Questions from '../UI/CompanyProfile/Quizzes/Questions';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectQuizzes } from '../../store/companies/quizzes/quizzesSelectors';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import {
  startQuizSession,
  getQuizInfo,
  finishQuizSession,
} from '../../store/companies/quizzes/quizzesActions';

const QuizPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { error, quizSession, loading, currentQuiz, quizResult } =
    useSelector(selectQuizzes);
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizInfo({ quiz: Number(param.quizSlug) }));
  }, [dispatch, param.quizSlug]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  const handleStartQuiz = () => {
    dispatch(startQuizSession({ quiz: Number(param.quizSlug) }));
  };

  const handleSubmit = answers => {
    dispatch(finishQuizSession({ session: quizSession.session_id, answers }));
  };

  return (
    <TextPage
      title={loading || !currentQuiz ? 'Loading...' : currentQuiz.title}
      titleVariant="h4"
      fiXheight={false}
    >
      {currentQuiz && (
        <>
          <Box
            sx={{
              padding: '8px',
              borderRadius: 1,
              mb: '16px',
              border: '4px solid #e08e45',
            }}
          >
            <Typography variant="body1">
              {`${t('QuizPage.QuizWasAdded')}: ${currentQuiz.created_at}`}
            </Typography>
            <Typography variant="body1">
              {`${t('QuizPage.FrequencyDays')}: ${currentQuiz.frequency_days}`}
            </Typography>
            <Typography variant="body1">
              {`${t('QuizPage.AboutQuiz')}: ${currentQuiz.description}`}
            </Typography>
            {quizSession && (
              <Typography variant="h6">
                {`${t('QuizPage.TestStartedAt')}: ${quizSession.start_session_time}`}
              </Typography>
            )}
          </Box>
          {quizResult && (
            <>
              <Box
                sx={{
                  padding: '8px',
                  borderRadius: 1,
                  mb: '16px',
                  border: '4px solid #e08e45',
                }}
              >
                <Typography variant="h6">
                  {t('QuizPage.QuizResults')}
                </Typography>
                <Typography variant="body1">
                  {`${t('QuizPage.Time')}: ${quizResult.quiz_time}`}
                </Typography>
                <Typography variant="body1">
                  {`${t('QuizPage.Score')}: ${(quizResult.correct_answers / quizResult.total_questions) * 100}/100`}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate(-1)}
                sx={{
                  mb: 1,
                  backgroundColor: '#e08e45',
                  color: '#f9e2b2',
                }}
              >
                {t('QuizPage.ReturnToCompanyPage')}
              </Button>
            </>
          )}
          {!quizSession && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleStartQuiz}
              sx={{
                mb: 1,
                backgroundColor: '#e08e45',
                color: '#f9e2b2',
              }}
            >
              {!quizResult ? t('QuizPage.StartQuiz') : t('QuizPage.TryAgain')}
            </Button>
          )}

          <>
            {quizSession && (
              <Questions
                onSubmit={handleSubmit}
                questions={quizSession.questions}
              />
            )}
          </>
        </>
      )}
    </TextPage>
  );
};

export default QuizPage;
