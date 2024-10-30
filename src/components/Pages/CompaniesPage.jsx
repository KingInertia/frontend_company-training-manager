import React from 'react';
import TextPage from '../UI/TextPage';
import { useState } from 'react';
import companiesList from '../../data/companiesList';
import TableList from '../UI/TableList';
const CompaniesPage = () => {
  const [companies, setCompanies] = useState(companiesList);
  const rowNames = ['Title', 'Posts', 'Phones'];
  return (
    <TextPage title="Companies">
      {companies.length > 0 && (
        <TableList rowNames={rowNames} list={companies} />
      )}
    </TextPage>
  );
};

export default CompaniesPage;
