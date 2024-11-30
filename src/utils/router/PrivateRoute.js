import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth/authSelectors';

const PrivateRoute = () => {
  const authToken = useSelector(selectAuthToken);

  if (localStorage.getItem('refreshToken') && !authToken) {
    return <Typography>Loading...</Typography>;
  }

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
