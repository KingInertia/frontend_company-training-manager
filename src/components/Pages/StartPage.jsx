import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setStrValue } from '../../store/testStr/testStrSlice';
import backendHealthCheck from '../../api/backendHealthCheck';

const StartPage = () => {
  const { t } = useTranslation();
  const strValue = useSelector(state => state.testStr.strValue);
  const dispatch = useDispatch();
  const [backendHeath, setBackendHealth] = useState('Loading...');

  useEffect(() => {
    backendHealthCheck()
      .then(data => {
        setBackendHealth('Server is healthy: ' + JSON.stringify(data));
      })
      .catch(error => {
        setBackendHealth('Backend is not working');
      });
  }, []);

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
            test
          </Button>
        </Box>
        <Box>
          <Typography variant="h3">Backend status:</Typography>
          <Typography variant="body1"> {backendHeath}</Typography>
        </Box>
      </Container>
    </div>
  );
};

export default StartPage;
