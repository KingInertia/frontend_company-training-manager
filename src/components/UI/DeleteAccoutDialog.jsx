import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { delUserProfile } from '../../store/userProfile/userProfileActions';
import { removeAuthToken } from '../../store/auth/authSlice';

const DeleteAccoutDialog = ({ open, handleClose, setSnackbarMessage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (password !== '') {
      setLoading(true);
      try {
        await delUserProfile({ password: password });
        dispatch(removeAuthToken());
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenTimestamp');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        setSnackbarMessage(errorMessage);
      }
      setLoading(false);
    } else {
      setSnackbarMessage(t('DeleteAccountDialog.PasswordRequired'));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('DeleteAccountDialog.DeleteProfile')}</DialogTitle>
      <DialogContent>
        <Typography>{t('DeleteAccountDialog.EnterPassword')}</Typography>
        <TextField
          fullWidth
          margin="normal"
          label={t('DeleteAccountDialog.Password')}
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      {loading ? (
        <Typography>{t('DeleteAccountDialog.Loading')}</Typography>
      ) : (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('DeleteAccountDialog.Cancel')}
          </Button>
          <Button onClick={handleDelete} color="error">
            {t('DeleteAccountDialog.Delete')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DeleteAccoutDialog;
