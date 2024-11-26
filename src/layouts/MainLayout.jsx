import React from 'react';
import NavigationBar from '../components/UI/NavigationBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import MySnackbar from '../components/UI/MySnackbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../store/auth/authSlice';
import { getUserProfile } from '../store/userProfile/userProfileActions';

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');

    if (authToken) {
      const checkAuth = async () => {
        try {
          await dispatch(getUserProfile({ authToken })).unwrap();
          dispatch(setAuthToken({ authToken, tokenTimestamp }));
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenTimestamp');
        }
      };

      checkAuth();
    }
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
          height: '100%',
          width: '1200px',
          marginTop: '8px',
          margin: '0 auto',
        }}
      >
        <Outlet />
      </Box>
      <MySnackbar />
    </Box>
  );
};

export default MainLayout;
