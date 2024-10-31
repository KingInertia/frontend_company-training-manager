import React from 'react';
import NavigationBar from '../components/UI/NavigationBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';

const MainLayout = () => {
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
    </Box>
  );
};

export default MainLayout;
