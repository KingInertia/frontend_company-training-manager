import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setStrValue } from '../../store/testStr/testStrSlice';

const StartPage = () => {
  const { t } = useTranslation();
  const strValue = useSelector(state => state.testStr.strValue);
  const dispatch = useDispatch();

  const handleStrValueChange = () => {
    dispatch(setStrValue('New str value'));
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h2">{t('startPage.title')}</Typography>
        <Button variant="contained">{t('startPage.button')}</Button>
        <Box>
          <Typography variant="h2">{strValue}</Typography>
          <Button variant="contained" onClick={handleStrValueChange}>
            {t('startPage.buttonChangeStrValue')}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default StartPage;
