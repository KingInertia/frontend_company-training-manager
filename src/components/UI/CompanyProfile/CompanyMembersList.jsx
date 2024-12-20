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
import MembersExportDialog from './MembersExportDialog';
import { listStates, manageStates } from '../../../constants/companyConst';
import { Button } from '@mui/material';

const CompanyMembersList = ({ companyId, membersManageState, listState }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openKickDialog, setOpenKickDialog] = useState(false);
  const [openAppointAdminDialog, setOpenAppointAdminDialog] = useState(false);
  const [openRemoveAdminDialog, setOpenRemoveAdminDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [memberForManage, setMemberForManage] = useState({});
  const navigate = useNavigate();
  const { error, currentCompanyMembers, currentCompanyAdmins } =
    useSelector(selectCompanyMembers);
  const rowNames = [
    t('CompanyMembersList.UserName'),
    t('CompanyMembersList.Company'),
    t('CompanyMembersList.User'),
    t('CompanyMembersList.Role'),
    t('CompanyMembersList.LastQuiz'),
  ];
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

      if (membersManageState === manageStates.KICK) {
        setMemberForManage(member);
        setOpenKickDialog(true);
      } else if (membersManageState === manageStates.APPOINT_ADMIN) {
        setMemberForManage(member);
        setOpenAppointAdminDialog(true);
      } else if (membersManageState === manageStates.REMOVE_ADMIN) {
        setMemberForManage(member);
        setOpenRemoveAdminDialog(true);
      } else if (membersManageState === manageStates.EXPORT_RESULTS) {
        setMemberForManage(member);
        setOpenExportDialog(true);
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

  const handleOpenExportDialog = () => {
    setMemberForManage({});
    setOpenExportDialog(true);
  };

  return (
    <>
      {listState === listStates.MEMBERS && (
        <>
          <Box
            sx={{
              backgroundColor:
                (membersManageState === manageStates.KICK) |
                (membersManageState === manageStates.REMOVE_ADMIN)
                  ? '#9e2a2f'
                  : (membersManageState === manageStates.APPOINT_ADMIN) |
                      (membersManageState === manageStates.EXPORT_RESULTS)
                    ? '#738f45'
                    : '#e08e45',
              padding: '8px',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
              {membersManageState === manageStates.KICK &&
                t('CompanyMembersList.SelectUserToKick')}
              {membersManageState === manageStates.APPOINT_ADMIN &&
                t('CompanyMembersList.SelectAdminToAppoint')}
              {membersManageState === manageStates.REMOVE_ADMIN &&
                t('CompanyMembersList.SelectAdminToRemove')}
              {membersManageState === manageStates.EXPORT_RESULTS &&
                t('CompanyMembersList.SelectUserToExport')}
              {!membersManageState && t('CompanyMembersList.Members')}
            </Typography>
          </Box>
          {membersManageState === manageStates.EXPORT_RESULTS && (
            <Button
              onClick={() => handleOpenExportDialog()}
              variant="contained"
              sx={{
                backgroundColor: '#e08e45',
                padding: '8px',
                borderRadius: 1,
                textAlign: 'center',
                mb: '8px',
                mt: '8px',
                mr: '2px',
                ml: '2px',
                height: '48px',
                color: '#f9e2b2',
              }}
            >
              {t('CompanyMembersList.ExportAllUsersResults')}
            </Button>
          )}
          {!currentCompanyMembers ? (
            <Typography>Loading...</Typography>
          ) : (
            currentCompanyMembers.length > 0 && (
              <TableList
                rowNames={rowNames}
                list={currentCompanyMembers}
                onClick={handleMemberControl}
                headTextSize="h7"
              />
            )
          )}
        </>
      )}
      {listState === listStates.ADMINS && (
        <>
          <Box
            sx={{
              backgroundColor:
                membersManageState === manageStates.KICK
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
      <MembersExportDialog
        member={memberForManage}
        companyId={companyId}
        handleClose={() => setOpenExportDialog(false)}
        open={openExportDialog}
      />
    </>
  );
};

export default CompanyMembersList;
