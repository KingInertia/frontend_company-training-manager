import React from 'react';
import TextPage from '../UI/TextPage';
import TableList from '../UI/TableList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCompaniesList } from '../../store/companies/companiesActions';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';

const CompaniesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, companies } = useSelector(state => state.companies);

  const rowNames = [
    t('CompanyProfile.dateCreated'),
    t('CompanyProfile.companyName'),
    t('CompanyProfile.description'),
  ];

  const cleanCompaniesList = companies
    ? companies.map(company => {
        const { updated_at, owner, visibility, ...rest } = company;
        return rest;
      })
    : [];

  useEffect(() => {
    dispatch(getCompaniesList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  return (
    <TextPage title={t('navigation.companies')}>
      <Box sx={{ height: '80vh', overflow: 'auto' }}>
        {!companies ? (
          <Typography>Loading...</Typography>
        ) : (
          companies.length > 0 && (
            <TableList
              rowNames={rowNames}
              list={cleanCompaniesList}
              navigateType="companies"
            />
          )
        )}
      </Box>
    </TextPage>
  );
};

export default CompaniesPage;
