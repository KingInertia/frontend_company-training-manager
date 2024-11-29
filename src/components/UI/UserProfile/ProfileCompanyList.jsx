import React from 'react';
import TableList from '../../UI/TableList';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyCompaniesList } from '../../../store/companies/companiesActions';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { selectCompanies } from '../../../store/companies/companiesSelectors';

const ProfileCompaniesList = () => {
  const dispatch = useDispatch();
  const { error, myCompanies } = useSelector(selectCompanies);

  const rowNames = [];

  useEffect(() => {
    dispatch(getMyCompaniesList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  return (
    <>
      {!myCompanies ? (
        <Typography>Loading...</Typography>
      ) : (
        myCompanies.length > 0 && (
          <TableList
            rowNames={rowNames}
            list={myCompanies}
            navigateType="companies"
          />
        )
      )}
    </>
  );
};

export default ProfileCompaniesList;
