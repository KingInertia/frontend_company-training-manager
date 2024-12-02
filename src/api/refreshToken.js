import { logout, setAuthToken } from '../store/auth/authSlice';
import store from '../store/store';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from './axiosInstance';

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
