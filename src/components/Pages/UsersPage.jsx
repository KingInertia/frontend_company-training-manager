import React from 'react';
import TextPage from '../UI/TextPage';
import usersList from '../../data/usersList';
import TableList from '../UI/TableList';

const UsersPage = () => {
  const rowNames = ['Names', 'Posts', 'Phones'];

  return (
    <TextPage title="Users">
      {usersList.length > 0 && (
        <TableList rowNames={rowNames} list={usersList} />
      )}
    </TextPage>
  );
};

export default UsersPage;
