import React from 'react';
import TextPage from '../UI/TextPage';
import TableList from '../UI/TableList';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUsersList } from '../../store/users/users.Actions';
import ErrorSnackbar from '../UI/ErrorSnackbar';

const UsersPage = () => {
  const { t } = useTranslation();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const { error, users } = useSelector(state => state.users);

  const rowNames = [
    'Login',
    'first_name',
    'last_name',
    'Post',
    'Date registration',
  ];

  const cleanUsersList = users
    ? users.map(user => {
        const {
          is_superuser,
          password,
          date_joined,
          updated_at,
          last_login,
          is_staff,
          is_active,
          groups,
          user_permissions,
          image_path,
          ...rest
        } = user;
        return rest;
      })
    : [];

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
    }
  }, [error]);

  return (
    <TextPage title={t('navigation.users')}>
      {!users ? (
        <Typography>Loading...</Typography>
      ) : (
        cleanUsersList.length > 0 && (
          <TableList rowNames={rowNames} list={cleanUsersList} />
        )
      )}
      <ErrorSnackbar message={snackbarMessage} />
    </TextPage>
  );
};

export default UsersPage;
