import React from 'react';
import TableList from '../../TableList';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserMembershipCompanies } from '../../../../store/companies/companiesActions';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';
import { selectCompanies } from '../../../../store/companies/companiesSelectors';

const ProfileCompaniesList = ({ userId }) => {
  const dispatch = useDispatch();
  const { error, userMembershipCompanies } = useSelector(selectCompanies);

  const rowNames = [];

  useEffect(() => {
    dispatch(getUserMembershipCompanies({ id: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  return (
    <>
      {!userMembershipCompanies ? (
        <Typography>Loading...</Typography>
      ) : (
        userMembershipCompanies.length > 0 && (
          <TableList
            headTextSize="h7"
            rowNames={rowNames}
            list={userMembershipCompanies}
            navigateType="companies"
          />
        )
      )}
    </>
  );
};

export default ProfileCompaniesList;
