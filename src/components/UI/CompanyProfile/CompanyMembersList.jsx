import TableList from '../TableList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCompanyMembers } from '../../../store/companies/members/companyMembersActions';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { selectCompanyMembers } from '../../../store/companies/members/companyMembersSelectors';
import KickMemberDialog from './KickMemberDialog';

const CompanyMembersList = ({ companyId, userKickMod }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openKickDialog, setOpenKickDialog] = useState(false);
  const [memberForKick, setMemberForKick] = useState({});
  const navigate = useNavigate();
  const { error, currentCompanyMembers } = useSelector(selectCompanyMembers);
  const rowNames = [];

  useEffect(() => {
    dispatch(getCompanyMembers({ companyId }));
  }, [dispatch, companyId]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  const handleMemberControl = id => {
    if (currentCompanyMembers) {
      const member = currentCompanyMembers.find(member => member.id === id);
      const userId = member.user;

      if (userKickMod) {
        setMemberForKick(member);
        setOpenKickDialog(true);
      } else {
        navigate(`/users/${userId}/`);
      }
    }
  };

  const handleCloseKickDiag = () => {
    setOpenKickDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: userKickMod ? '#9e2a2f' : '#e08e45',
          padding: '8px',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
          {userKickMod
            ? t('CompanyMembersList.SelectUserToKick')
            : t('CompanyMembersList.Members')}
        </Typography>
      </Box>
      {!currentCompanyMembers ? (
        <Typography>Loading...</Typography>
      ) : (
        currentCompanyMembers.length > 0 && (
          <TableList
            rowNames={rowNames}
            list={currentCompanyMembers}
            onClick={handleMemberControl}
          />
        )
      )}
      <KickMemberDialog
        memberForKick={memberForKick}
        handleClose={handleCloseKickDiag}
        open={openKickDialog}
      />
    </>
  );
};

export default CompanyMembersList;
