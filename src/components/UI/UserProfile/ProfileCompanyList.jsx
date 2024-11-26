import React from 'react';
import TableList from '../../UI/TableList';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCompaniesList } from '../../../store/companies/companiesActions';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';

const ProfileCompaniesList = ({ ownerId }) => {
  const dispatch = useDispatch();
  const { error, companies } = useSelector(state => state.companies);

  const rowNames = [];

  const cleanCompaniesList = companies
    ? companies
        .filter(item => item.owner === ownerId)
        .map(company => {
          const {
            updated_at,
            owner,
            visibility,
            created_at,
            description,
            ...rest
          } = company;
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
    <>
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
    </>
  );
};

export default ProfileCompaniesList;
