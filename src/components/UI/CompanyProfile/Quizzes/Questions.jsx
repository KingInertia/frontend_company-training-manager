import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const Questions = ({ onSubmit, questions }) => {
  const { t } = useTranslation();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerChange = (questionId, answer) => {
    const questionAnswers = selectedAnswers.find(ans => ans.id === questionId);

    if (questionAnswers) {
      let correct_answer;

      correct_answer = questionAnswers.correct_answer.includes(answer)
        ? questionAnswers.correct_answer.filter(ans => ans !== answer)
        : [...questionAnswers.correct_answer, answer];

      const newAnswers = selectedAnswers.map(answer =>
        answer.id === questionId ? { id: questionId, correct_answer } : answer,
      );
      setSelectedAnswers(newAnswers);
    } else {
      setSelectedAnswers([
        ...selectedAnswers,
        {
          id: questionId,
          correct_answer: [answer],
        },
      ]);
    }
  };

  const Question = ({ question, index }) => {
    return (
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          {`${index + 1}) ${question.text}`}
        </Typography>
        <FormGroup>
          {question.answers.map((answer, idx) => (
            <FormControlLabel
              key={uuidv4()}
              control={
                <Checkbox
                  checked={
                    selectedAnswers
                      .find(ans => ans.id === question.id)
                      ?.correct_answer.includes(answer) || false
                  }
                  onChange={() => handleAnswerChange(question.id, answer)}
                />
              }
              label={`${String.fromCharCode(65 + idx)}) ${answer}`}
            />
          ))}
        </FormGroup>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          padding: '24px',
          borderRadius: 1,
          mb: '16px',
          border: '4px solid #e08e45',
        }}
      >
        {questions.map((question, index) => (
          <Question key={uuidv4()} question={question} index={index} />
        ))}
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={() => onSubmit(selectedAnswers)}
        sx={{
          mb: 1,
          backgroundColor: '#e08e45',
        }}
      >
        {t('Questions.CompleteQuiz')}
      </Button>
    </>
  );
};

export default Questions;
