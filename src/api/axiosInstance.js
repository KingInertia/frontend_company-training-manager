import axios from 'axios';
import { removeAuthToken } from '../store/auth/authSlice';
import { logoutUser } from '../store/auth/authActions';

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
      const { authToken, tokenTimestamp } = state.auth;
      const tokenExpirationTime = 3600 * 1000 * 12; // 12 hour

      if (authToken) {
        const tokenLifeTime = Date.now() - tokenTimestamp;
        if (tokenLifeTime > tokenExpirationTime) {
          await logoutUser(authToken);
          store.dispatch(removeAuthToken());
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenTimestamp');
          throw new Error('Token expired');
        }
        if (config.url.includes('/api/v1/auth/users/me/')) {
          config.headers.Authorization = `Token ${authToken}`;
        }
      }

      return config;
    },
    error => Promise.reject(error),
  );
};
export default axiosInstance;
