import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { getUserProfile } from '../../store/userProfile/userProfileActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth/authSelectors';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useSelector(state => state.userProfile);
  const authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (authToken && !(success || error)) {
      dispatch(getUserProfile({ authToken }));
    } else {
      setIsLoading(false);
    }
  }, [authToken, dispatch, success, error]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return success && authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
