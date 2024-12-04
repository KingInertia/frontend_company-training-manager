import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { useDispatch } from 'react-redux';
import { appointCompanyAdmin } from '../../../store/companies/members/companyMembersActions';

const AppointAdminDialog = ({ memberForAppoint, handleClose, open }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleKick = async () => {
    try {
      await appointCompanyAdmin({
        companyId: memberForAppoint.company,
        userId: memberForAppoint.user,
      });
      dispatch(setSnackbarMessage(t('AppointAdminDialog.UserAppointAdmin')));
      handleClose();
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t('AppointAdminDialog.AppointCurrentUserAdmin')}
        </DialogTitle>
        <DialogContent sx={{ width: '300px' }}>
          <Typography>{memberForAppoint.user_name}</Typography>
        </DialogContent>
        {loading ? (
          <Typography>{t('AppointAdminDialog.AppointingNewAdmin')}</Typography>
        ) : (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t('KickMemberDialog.Cancel')}
            </Button>
            <Button onClick={handleKick} color="error">
              {t('AppointAdminDialog.AppointAdmin')}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default AppointAdminDialog;
