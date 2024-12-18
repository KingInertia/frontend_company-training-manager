import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from '../../PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { createNewQuiz } from '../../../../store/companies/quizzes/quizzesActions';
import { selectQuizzes } from '../../../../store/companies/quizzes/quizzesSelectors';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';

const CreateQuizModal = ({ open, onClose, companyId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const { loading, error, success } = useSelector(selectQuizzes);

  const handleAddAnswer = () => {
    if (currentAnswer.trim()) {
      setCurrentAnswers([...currentAnswers, currentAnswer.trim()]);
      setCurrentAnswer('');
    } else {
      dispatch(setSnackbarMessage(t('CreateQuizModal.AnswerCannotBeEmpty')));
    }
  };

  const handleDeleteAnswer = index => {
    const updatedAnswers = currentAnswers.filter(
      (_, answerIndex) => answerIndex !== index,
    );
    setCurrentAnswers(updatedAnswers);
    setCurrentCorrectAnswer(
      currentCorrectAnswer.filter(answer => answer !== currentAnswers[index]),
    );
  };

  const handleAddOrEditQuestion = () => {
    if (
      currentQuestionText &&
      currentAnswers.length >= 2 &&
      currentCorrectAnswer.length >= 1
    ) {
      const newQuestion = {
        text: currentQuestionText,
        answers: currentAnswers,
        correct_answer: currentCorrectAnswer,
      };

      if (editMode && editingQuestionIndex !== null) {
        const updatedQuestions = [...questions];
        updatedQuestions[editingQuestionIndex] = newQuestion;
        setQuestions(updatedQuestions);
        setEditMode(false);
        setEditingQuestionIndex(null);
      } else {
        setQuestions([...questions, newQuestion]);
      }

      setCurrentQuestionText('');
      setCurrentAnswers([]);
      setCurrentCorrectAnswer([]);
    } else {
      dispatch(
        setSnackbarMessage(t('CreateQuizModal.ValidQuestionRequirement')),
      );
    }
  };

  const handleEditQuestion = index => {
    const questionToEdit = questions[index];
    setCurrentQuestionText(questionToEdit.text);
    setCurrentAnswers(questionToEdit.answers);
    setCurrentCorrectAnswer(questionToEdit.correct_answer);
    setEditMode(true);
    setEditingQuestionIndex(index);
  };

  const handleDeleteQuestion = index => {
    const updatedQuestions = questions.filter(
      (_, questionIndex) => questionIndex !== index,
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    if (title && description && frequency && questions.length >= 2) {
      const quizData = {
        title,
        description,
        frequency_days: frequency,
        company: companyId,
        questions,
      };
      dispatch(createNewQuiz({ quiz: quizData }));
    } else {
      dispatch(
        setSnackbarMessage(t('CreateQuizModal.RequiredFieldsAndQuestions')),
      );
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    } else if (success) {
      dispatch(setSnackbarMessage(t('CreateQuizModal.QuizSuccessfullyAdded')));
    }
  }, [error, success, dispatch, t]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: '1400px',
          display: 'flex',
          margin: 'auto',
          marginTop: '80px',
          minHeight: '600px',
        }}
      >
        <PageContainer title={t('CreateQuizModal.AddNewQuiz')}>
          {loading ? (
            <Typography>{t('CreateQuizModal.AddingNewQuiz')}</Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  minHeight: '520px',
                }}
              >
                <Box
                  sx={{
                    flexDirection: 'column',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '4px solid #e08e45',
                    flex: 2,
                    mr: '8px',
                    ml: '8px',
                  }}
                >
                  <TextField
                    label={t('CreateQuizModal.Title')}
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    label={t('CreateQuizModal.Description')}
                    fullWidth
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    label={t('CreateQuizModal.FrequencyDays')}
                    type="number"
                    fullWidth
                    value={frequency}
                    onChange={e => setFrequency(e.target.value)}
                    margin="normal"
                  />

                  <TextField
                    label={t('CreateQuizModal.Question')}
                    fullWidth
                    value={currentQuestionText}
                    onChange={e => setCurrentQuestionText(e.target.value)}
                    margin="normal"
                  />

                  <Typography variant="subtitle2" sx={{ marginTop: '16px' }}>
                    {t('CreateQuizModal.Answers')}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <TextField
                      label={t('CreateQuizModal.AddAnswer')}
                      fullWidth
                      value={currentAnswer}
                      onChange={e => setCurrentAnswer(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddAnswer}
                      sx={{ backgroundColor: '#e08e45' }}
                    >
                      {t('CreateQuizModal.Add')}
                    </Button>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddOrEditQuestion}
                    sx={{
                      marginTop: '16px',
                      backgroundColor: '#e08e45',
                    }}
                  >
                    {editMode
                      ? t('CreateQuizModal.SaveChanges')
                      : t('CreateQuizModal.AddQuestion')}
                  </Button>
                </Box>
                <Box
                  sx={{
                    flexDirection: 'column',
                    padding: '8px',
                    border: '4px solid #e08e45',
                    flex: 1,
                    mr: '8px',
                    ml: '8px',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ marginTop: '16px' }}>
                    {t('CreateQuizModal.AnswersLabel')}
                  </Typography>

                  <List>
                    {currentAnswers.map((answer, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteAnswer(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={currentCorrectAnswer.includes(answer)}
                              onChange={() => {
                                if (currentCorrectAnswer.includes(answer)) {
                                  setCurrentCorrectAnswer(
                                    currentCorrectAnswer.filter(
                                      answ => answ !== answer,
                                    ),
                                  );
                                } else {
                                  setCurrentCorrectAnswer([
                                    ...currentCorrectAnswer,
                                    answer,
                                  ]);
                                }
                              }}
                            />
                          }
                          label={answer}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box
                  sx={{
                    flexDirection: 'column',
                    padding: '8px',
                    border: '4px solid #e08e45',
                    flex: 1,
                    mr: '8px',
                    ml: '8px',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ marginTop: '16px' }}>
                    {t('CreateQuizModal.ExistingQuestions')}
                  </Typography>

                  <List>
                    {questions.map((question, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <>
                            <IconButton
                              edge="end"
                              onClick={() => handleEditQuestion(index)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteQuestion(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText
                          primary={question.text}
                          secondary={`Answers: ${question.answers.join(', ')}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  marginTop: '16px',
                  marginBottom: '8px',
                  backgroundColor: '#e08e45',
                }}
              >
                Submit Quiz
              </Button>
            </>
          )}
        </PageContainer>
      </Box>
    </Modal>
  );
};

export default CreateQuizModal;
