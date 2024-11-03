import React from 'react';
import TextPage from '../UI/TextPage';
import usersList from '../../data/usersList';
import TableList from '../UI/TableList';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const { t } = useTranslation();
  const rowNames = [t('users.names'), t('users.posts'), t('users.phones')];

  return (
    <TextPage title={t('navigation.users')}>
      {usersList.length > 0 && (
        <TableList rowNames={rowNames} list={usersList} />
      )}
    </TextPage>
  );
};

export default UsersPage;
