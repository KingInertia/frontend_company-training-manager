import { logout, setAuthToken } from '../store/auth/authSlice';
import store from '../store/store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshAuthToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    const { data } = await axiosInstance.post('/api/v1/auth/jwt/refresh/', {
      refresh: refreshToken,
    });
    const { access } = data;
    const decodedAccessToken = jwtDecode(access);
    const tokenExpirationTime = decodedAccessToken.exp * 1000;
    store.dispatch(
      setAuthToken({
        accessToken: access,
        refreshToken: refreshToken,
        tokenExpirationTime,
      }),
    );

    return access;
  } catch (error) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpirationTime');
    store.dispatch(logout());
    window.location.href = '/login';
  }
};
