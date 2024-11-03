import React from 'react';
import TextPage from '../UI/TextPage';
import companiesList from '../../data/companiesList';
import TableList from '../UI/TableList';
import { useTranslation } from 'react-i18next';

const CompaniesPage = () => {
  const { t } = useTranslation();
  const rowNames = [
    t('companies.titles'),
    t('companies.posts'),
    t('companies.phones'),
  ];

  return (
    <TextPage title={t('navigation.companies')}>
      {companiesList.length > 0 && (
        <TableList rowNames={rowNames} list={companiesList} />
      )}
    </TextPage>
  );
};

export default CompaniesPage;
