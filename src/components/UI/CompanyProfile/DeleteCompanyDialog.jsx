import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { delCurrentCompany } from '../../../store/companies/companiesActions';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import { useDispatch } from 'react-redux';

const DeleteCompanyDialog = ({ open, handleClose, companyName, id }) => {
  const { t } = useTranslation();
  const [inputCompanyName, setInputCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (inputCompanyName === companyName) {
      setLoading(true);

      try {
        await delCurrentCompany(id);
        dispatch(setSnackbarMessage(t('DeleteCompanyDialog.SuccessMessage')));
        navigate(-1);
        handleClose();
      } catch (error) {
        const errorMessage = error.response
          ? Object.values(error.response.data).join(' ')
          : error.message;
        dispatch(setSnackbarMessage(errorMessage));
      }
      setLoading(false);
    } else {
      dispatch(setSnackbarMessage(t('DeleteCompanyDialog.InvalidCompanyName')));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('DeleteCompanyDialog.DeleteCompany')}</DialogTitle>
      <DialogContent>
        <Typography>
          {t('DeleteCompanyDialog.ConfirmationMessage', { companyName })}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label={t('DeleteCompanyDialog.CompanyName')}
          variant="outlined"
          value={inputCompanyName}
          onChange={e => setInputCompanyName(e.target.value)}
        />
      </DialogContent>
      {loading ? (
        <Typography>{t('DeleteCompanyDialog.Loading')}</Typography>
      ) : (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('DeleteCompanyDialog.Cancel')}
          </Button>
          <Button onClick={handleDelete} color="error">
            {t('DeleteCompanyDialog.Delete')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DeleteCompanyDialog;
