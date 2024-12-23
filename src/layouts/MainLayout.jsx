import React from 'react';
import NavigationBar from '../components/UI/NavigationBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import MySnackbar from '../components/UI/MySnackbar';
import NotificationWindow from '../components/UI/NotificationWindow';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../store/auth/authSlice';
import { getUserProfile } from '../store/userProfile/userProfileActions';

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');

    const checkAuth = async () => {
      if (refreshToken) {
        await dispatch(
          setAuthToken({
            accessToken,
            refreshToken,
            tokenExpirationTime,
          }),
        );
        dispatch(getUserProfile());
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}
    >
      <NavigationBar />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          width: '1200px',
          marginTop: '8px',
          margin: '0 auto',
        }}
      >
        <Outlet />
      </Box>
      <MySnackbar />
      <NotificationWindow />
    </Box>
  );
};

export default MainLayout;
