import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { getMyCompaniesList } from '../../../store/companies/companiesActions';
import { sendInvitation } from '../../../store/companies/invitations/invitationsActions';
import { selectCompanies } from '../../../store/companies/companiesSelectors';
import { selectInvitations } from '../../../store/companies/invitations/invitationsSelectors';
import { clearError } from '../../../store/companies/invitations/invitationsSlice';
import TableList from '../TableList';

const InviteCompanyDialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    error: invitationError,
    success,
    loading: invitationLoading,
  } = useSelector(selectInvitations);
  const { error, myCompanies } = useSelector(selectCompanies);

  const rowNames = [];

  useEffect(() => {
    dispatch(getMyCompaniesList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    } else if (success) {
      dispatch(setSnackbarMessage(t('InvitationCompanyDialog.InvitationSent')));
      handleClose();
    }
  }, [error, success, dispatch, t, handleClose]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (invitationError) {
      dispatch(setSnackbarMessage(invitationError));
    }
  }, [invitationError, dispatch]);

  const handleCompanyInvite = id => {
    dispatch(sendInvitation({ receiver: userId, company: id }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {invitationLoading ? (
        <DialogTitle>{t('InvitationCompanyDialog.InviteSending')}</DialogTitle>
      ) : (
        <>
          <DialogContent
            sx={{
              width: '500px',
              height: '300px',
              backgroundColor: '#e5ab6c',
            }}
          >
            <DialogTitle>
              {t('InvitationCompanyDialog.SelectCompanyToInvite')}
            </DialogTitle>
            <Box
              sx={{
                backgroundColor: '#e08e45',
                padding: '8px',
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
                {t('InvitationCompanyDialog.YourCompanies')}
              </Typography>
            </Box>
            {!myCompanies ? (
              <Typography>Loading...</Typography>
            ) : (
              myCompanies.length > 0 && (
                <TableList
                  rowNames={rowNames}
                  list={myCompanies}
                  onClick={handleCompanyInvite}
                />
              )
            )}
          </DialogContent>

          <DialogActions sx={{ backgroundColor: '#e5ab6c' }}>
            <Button onClick={handleClose} color="primary">
              {t('InvitationCompanyDialog.Cancel')}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default InviteCompanyDialog;
