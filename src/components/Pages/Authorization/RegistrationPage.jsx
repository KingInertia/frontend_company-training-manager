import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ErrorSnackbar from '../../UI/ErrorSnackbar';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../store/auth/authActions';
import {
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
} from '../../../store/auth/authSelectors';
import URLS from '../../../constants/urls';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (!login || !email || !password || !confirmPassword) {
      setSnackbarMessage(t('Registration.fillInAllFields'));
      return;
    }

    if (!validateEmail(email)) {
      setSnackbarMessage(t('Registration.invalidEmail'));
      return;
    }

    if (!validatePassword(password)) {
      setSnackbarMessage(t('Registration.invalidPassword'));
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage(t('Registration.passwordsDoNotMatch'));
      return;
    }

    dispatch(
      registerUser({ username: login, email: email, password: password }),
    );
  };

  useEffect(() => {
    if (error) {
      setSnackbarMessage(t('Registration.tryLater') + error);
    }
  }, [error, t]);

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-])[A-Za-z\d!@#$%^&*_-]{8,}$/;

    return passwordRegex.test(password);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('Registration.title')}
        </Typography>
        {success ? (
          <Box sx={{ alignItems: 'center' }}>
            <Typography variant="h5">{t('Registration.success')}</Typography>
            <Link component={RouterLink} to={URLS.LOGIN} variant="h5">
              {t('Registration.toLoginPage')}
            </Link>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label={t('Registration.login')}
              name="login"
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label={t('Registration.email')}
              type="email"
              id="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('Registration.password')}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={t('Registration.confirmPassword')}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#e08e45' }}
            >
              {loading ? t('Registration.loading') : t('Registration.signUp')}
            </Button>
            <Link component={RouterLink} to={URLS.LOGIN} variant="body2">
              {t('Registration.alreadyHaveAccount')}
            </Link>
          </Box>
        )}
        <ErrorSnackbar message={snackbarMessage} />
      </Box>
    </Container>
  );
};

export default RegistrationPage;
