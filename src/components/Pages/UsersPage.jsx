import React from 'react';
import TextPage from '../UI/TextPage';
import { useState } from 'react';
import usersList from '../../data/usersList';
import TableList from '../UI/TableList';
const UsersPage = () => {
  const [users, setUsers] = useState(usersList);
  const rowNames = ['Names', 'Posts', 'Phones'];
  return (
    <TextPage title="Users">
      {users.length > 0 && <TableList rowNames={rowNames} list={users} />}
    </TextPage>
  );
};

export default UsersPage;
