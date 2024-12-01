import axios from 'axios';
import ROUTES from '../constants/routes';
import { refreshAuthToken } from './refreshToken';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setupInterceptors = store => {
  axiosInstance.interceptors.request.use(
    async config => {
      const state = store.getState();
      const { accessToken, refreshToken, tokenExpirationTime } = state.auth;
      if (refreshToken) {
        if (ROUTES.some(route => config.url.includes(route))) {
          if (tokenExpirationTime && Date.now() > tokenExpirationTime) {
            const newToken = await refreshAuthToken();

            if (
              newToken &&
              ROUTES.some(route => config.url.includes(route)) &&
              newToken
            ) {
              config.headers.Authorization = `Bearer ${newToken}`;
            }
          } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
      }

      return config;
    },
    error => Promise.reject(error),
  );
};
export default axiosInstance;
