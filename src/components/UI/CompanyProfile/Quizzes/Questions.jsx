import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const Questions = ({ onSubmit, questions }) => {
  const { t } = useTranslation();
  const [currentCorrectAnswers, setCurrentCorrectAnswers] = useState([]);

  const handleAnswerChange = (questionId, answer) => {
    const currentAnswer = currentCorrectAnswers.find(
      ans => ans.id === questionId,
    );

    if (currentAnswer) {
      let correct_answer;

      if (currentAnswer.correct_answer.includes(answer)) {
        correct_answer = currentAnswer.correct_answer.filter(
          ans => ans !== answer,
        );
      } else {
        correct_answer = [...currentAnswer.correct_answer, answer];
      }

      const newAnswers = currentCorrectAnswers.map(answer =>
        answer.id === questionId ? { id: questionId, correct_answer } : answer,
      );
      setCurrentCorrectAnswers(newAnswers);
    } else {
      setCurrentCorrectAnswers([
        ...currentCorrectAnswers,
        {
          id: questionId,
          correct_answer: [answer],
        },
      ]);
    }
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
          <Box key={question.id} sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>
              {`${index + 1}) ${question.text}`}
            </Typography>
            <FormGroup>
              {question.answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={
                        currentCorrectAnswers
                          .find(ans => ans.id === question.id)
                          ?.correct_answer.includes(answer) || false
                      }
                      onChange={() => handleAnswerChange(question.id, answer)}
                    />
                  }
                  label={`${String.fromCharCode(65 + index)}) ${answer}`}
                />
              ))}
            </FormGroup>
          </Box>
        ))}
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={() => onSubmit(currentCorrectAnswers)}
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
