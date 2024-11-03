import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const StartPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h2">{t('startPage.title')}</Typography>
        <Button variant="contained">{t('startPage.button')}</Button>
      </Container>
    </div>
  );
};

export default StartPage;
