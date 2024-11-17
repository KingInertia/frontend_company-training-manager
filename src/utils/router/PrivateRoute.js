import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useTokenLifeTimeCheck from '../../hooks/useTokenLifeTimeCheck';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/userProfile/userProfileActions';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useSelector(state => state.userProfile);
  const { userToken } = useSelector(state => state.login);
  const isTokenExpired = useTokenLifeTimeCheck();

  useEffect(() => {
    if (isTokenExpired !== null && (success || error)) {
      setIsLoading(false);
    }
    if (!success || error) {
      dispatch(getUserProfile({ userToken: userToken }));
    }
  }, [isTokenExpired, success, error, userToken]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isTokenExpired && success) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
