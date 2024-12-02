import axiosInstance from '../../api/axiosInstance';

export const registerUser = async ({ username, email, password }) => {
  try {
    await axiosInstance.post('/api/v1/auth/users/', {
      username,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};
