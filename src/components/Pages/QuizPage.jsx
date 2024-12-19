import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PageContainer from '../UI/PageContainer';
import Questions from '../UI/CompanyProfile/Quizzes/Questions';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useGetQuizInfo,
  useStartQuizSession,
  useFinishQuizSession,
} from '../../utils/hooks/quizHooks';

const QuizPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizSession, setQuizSession] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const getQuizInfo = useGetQuizInfo();
  const startQuizSession = useStartQuizSession();
  const finishQuizSession = useFinishQuizSession();

  useEffect(() => {
    async function quizInfo() {
      setLoading(true);
      setCurrentQuiz(await getQuizInfo(param.quizSlug));
      setLoading(false);
    }
    quizInfo();
  }, [param.quizSlug, getQuizInfo]);

  const handleStartQuiz = async () => {
    setLoading(true);
    setQuizSession(await startQuizSession(param.quizSlug));
    setQuizResult(null);
    setLoading(false);
  };

  const handleSubmit = async answers => {
    setLoading(true);
    setQuizResult(await finishQuizSession(answers, quizSession.session_id));
    setQuizSession(null);
    setLoading(false);
  };

  return (
    <PageContainer
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
                onClick={() => navigate(`/companies/${param.companySlug}`)}
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
    </PageContainer>
  );
};

export default QuizPage;
