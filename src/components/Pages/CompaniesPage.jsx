import React from 'react';
import TextPage from '../UI/TextPage';
import companiesList from '../../data/companiesList';
import TableList from '../UI/TableList';

const CompaniesPage = () => {
  const rowNames = ['Title', 'Posts', 'Phones'];

  return (
    <TextPage title="Companies">
      {companiesList.length > 0 && (
        <TableList rowNames={rowNames} list={companiesList} />
      )}
    </TextPage>
  );
};

export default CompaniesPage;
