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
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { setAuthToken } from '../../../store/auth/authSlice';
import URLS from '../../../constants/urls';
import { getUserProfile } from '../../../store/userProfile/userProfileActions';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { selectAuthToken } from '../../../store/auth/authSelectors';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [dispatch, navigate, authToken]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login');
    const password = data.get('password');

    if (!login || !password) {
      const errorMessage = login
        ? password
          ? ''
          : t('Login.PasswordRequired')
        : t('Login.LoginRequired');
      dispatch(setSnackbarMessage(errorMessage));
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/api/v1/auth/jwt/create/', {
        username: login,
        password: password,
      });

      const { access, refresh } = data;

      const decodedAccessToken = jwtDecode(access);
      const tokenExpirationTime = decodedAccessToken.exp * 1000;

      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('accessToken', access);
      localStorage.setItem('tokenExpirationTime', tokenExpirationTime);

      dispatch(
        setAuthToken({
          accessToken: access,
          refreshToken: refresh,
          tokenExpirationTime,
        }),
      );

      dispatch(getUserProfile());

      navigate('/');
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));
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
      </Box>
    </Container>
  );
}
