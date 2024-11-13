import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useTokenLifeTimeCheck from '../../hooks/useTokenLifeTimeCheck';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isTokenExpired = useTokenLifeTimeCheck();

  useEffect(() => {
    if (isTokenExpired !== null) {
      setIsLoading(false);
    }
  }, [isTokenExpired]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isTokenExpired) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
