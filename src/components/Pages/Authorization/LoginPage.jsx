import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Facebook from '@mui/icons-material/Facebook';
import Google from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { setAuthToken } from '../../../store/auth/authSlice';
import ErrorSnackbar from '../../UI/ErrorSnackbar';
import URLS from '../../../constants/urls';
import { getUserProfile } from '../../../store/userProfile/userProfileActions';

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');

    if (authToken) {
      dispatch(setAuthToken({ authToken, tokenTimestamp }));
      dispatch(getUserProfile({ authToken }));
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login');
    const password = data.get('password');
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/api/v1/auth/token/login/', {
        username: login,
        password: password,
      });
      const authToken = data.auth_token;
      const tokenTimestamp = Date.now();
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('tokenTimestamp', tokenTimestamp);
      dispatch(setAuthToken({ authToken, tokenTimestamp }));
      dispatch(getUserProfile({ authToken }));
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setSnackbarMessage(errorMessage);
    }
    setLoading(false);
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
          {t('Login.signIn')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={t('Registration.login')}
            name="login"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('Login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t('Login.rememberMe')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#e08e45' }}
          >
            {loading ? t('Login.loading') : t('Login.signIn')}
          </Button>
          <Link component={RouterLink} to={URLS.REGISTRATION} variant="body2">
            {t('Login.dontHaveAccount')}
          </Link>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid>
              <IconButton sx={{ mr: 2 }}>
                <Facebook
                  fontSize="large"
                  sx={{
                    color: '#eb8a3e',
                  }}
                />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton sx={{ mr: 2 }}>
                <Google
                  fontSize="large"
                  sx={{
                    color: '#eb8a3e',
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <ErrorSnackbar message={snackbarMessage} />
      </Box>
    </Container>
  );
}
