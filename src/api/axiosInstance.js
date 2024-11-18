import axios from 'axios';
import { removeUserToken } from '../store/auth/authSlice';
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
      const { userToken, tokenTimestamp } = state.auth;
      const tokenExpirationTime = 3600 * 1000; // 1 hour

      if (userToken) {
        const tokenLifeTime = Date.now() - tokenTimestamp;
        if (tokenLifeTime > tokenExpirationTime) {
          await logoutUser(userToken);
          store.dispatch(removeUserToken());
          localStorage.removeItem('userToken');
          localStorage.removeItem('tokenTimestamp');
          throw new Error('Token expired');
        }
      }

      return config;
    },
    error => Promise.reject(error),
  );
};
export default axiosInstance;
