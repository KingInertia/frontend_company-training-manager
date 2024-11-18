import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { getUserProfile } from '../../store/userProfile/userProfileActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../store/auth/authSelectors';
import {
  selectUserProfileSuccess,
  selectUserProfileError,
} from '../../store/userProfile/userProfileSelectors';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const success = useSelector(selectUserProfileSuccess);
  const error = useSelector(selectUserProfileError);
  const userToken = useSelector(selectUserToken);

  useEffect(() => {
    if (userToken && !(success || error)) {
      dispatch(getUserProfile({ userToken }));
    } else {
      setIsLoading(false);
    }
  }, [userToken, dispatch, success, error]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return success && userToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
