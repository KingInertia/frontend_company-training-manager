import TableList from '../TableList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getCompanyMembers,
  getCompanyAdmins,
} from '../../../store/companies/members/companyMembersActions';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { selectCompanyMembers } from '../../../store/companies/members/companyMembersSelectors';
import KickMemberDialog from './KickMemberDialog';
import AppointAdminDialog from './AppointAdminDialog';
import RemoveAdminDialog from './RemoveAdminDialog';

const CompanyMembersList = ({ companyId, membersManageState, listState }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openKickDialog, setOpenKickDialog] = useState(false);
  const [openAppointAdminDialog, setOpenAppointAdminDialog] = useState(false);
  const [openRemoveAdminDialog, setOpenRemoveAdminDialog] = useState(false);
  const [memberForManage, setMemberForManage] = useState({});
  const navigate = useNavigate();
  const { error, currentCompanyMembers, currentCompanyAdmins } =
    useSelector(selectCompanyMembers);
  const rowNames = [];
  const memberListState = {
    MEMBERS: 'members',
    ADMINS: 'admins',
  };
  const membersManageStates = {
    KICK: 'kick',
    APPOINT_ADMIN: 'appoint admin',
    REMOVE_ADMIN: 'remove admin',
  };

  useEffect(() => {
    dispatch(getCompanyMembers({ companyId }));
    dispatch(getCompanyAdmins({ companyId }));
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

      if (membersManageState === membersManageStates.KICK) {
        setMemberForManage(member);
        setOpenKickDialog(true);
      } else if (membersManageState === membersManageStates.APPOINT_ADMIN) {
        setMemberForManage(member);
        setOpenAppointAdminDialog(true);
      } else if (membersManageState === membersManageStates.REMOVE_ADMIN) {
        setMemberForManage(member);
        setOpenRemoveAdminDialog(true);
      } else {
        navigate(`/users/${userId}/`);
      }
    }
  };

  const handleCloseKickDiag = () => {
    setOpenKickDialog(false);
  };

  const handleCloseAppointAdminDiag = () => {
    setOpenAppointAdminDialog(false);
  };

  const handleCloseRemoveAdminDiag = () => {
    setOpenRemoveAdminDialog(false);
  };

  return (
    <>
      {listState === memberListState.MEMBERS ? (
        <>
          <Box
            sx={{
              backgroundColor:
                (membersManageState === membersManageStates.KICK) |
                (membersManageState === membersManageStates.REMOVE_ADMIN)
                  ? '#9e2a2f'
                  : membersManageState === membersManageStates.APPOINT_ADMIN
                    ? '#738f45'
                    : '#e08e45',
              padding: '8px',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
              {membersManageState === membersManageStates.KICK &&
                t('CompanyMembersList.SelectUserToKick')}
              {membersManageState === membersManageStates.APPOINT_ADMIN &&
                t('CompanyMembersList.SelectAdminToAppoint')}
              {membersManageState === membersManageStates.REMOVE_ADMIN &&
                t('CompanyMembersList.SelectAdminToRemove')}
              {!membersManageState && t('CompanyMembersList.Members')}
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
        </>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor:
                membersManageState === membersManageStates.KICK
                  ? '#9e2a2f'
                  : '#e08e45',
              padding: '8px',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
              {t('CompanyMembersList.Admins')}
            </Typography>
          </Box>
          {!currentCompanyAdmins ? (
            <Typography>Loading...</Typography>
          ) : (
            currentCompanyAdmins.length > 0 && (
              <TableList
                rowNames={rowNames}
                list={currentCompanyAdmins}
                onClick={handleMemberControl}
              />
            )
          )}
        </>
      )}
      <KickMemberDialog
        memberForKick={memberForManage}
        handleClose={handleCloseKickDiag}
        open={openKickDialog}
      />
      <AppointAdminDialog
        memberForAppoint={memberForManage}
        handleClose={handleCloseAppointAdminDiag}
        open={openAppointAdminDialog}
      />
      <RemoveAdminDialog
        adminForRemove={memberForManage}
        handleClose={handleCloseRemoveAdminDiag}
        open={openRemoveAdminDialog}
      />
    </>
  );
};

export default CompanyMembersList;
