import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';
import {
  createNewCompany,
  getMyCompaniesList,
} from '../../../store/companies/companiesActions';
import { selectCompanies } from '../../../store/companies/companiesSelectors';

const CreateCompanyDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('visible');
  const { loading, error } = useSelector(selectCompanies);

  const handleCreate = async () => {
    if (!name.trim()) {
      dispatch(setSnackbarMessage(t('AddCompanyDialog.FieldRequired')));
      return;
    }
    const companyProperties = {
      name,
      description,
      visibility,
    };
    await dispatch(createNewCompany({ companyProperties }));
    dispatch(getMyCompaniesList({ companyProperties }));
    dispatch(setSnackbarMessage(t('AddCompanyDialog.SuccessMessage')));
    handleClose();
  };

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('AddCompanyDialog.AddCompany')}</DialogTitle>
      <DialogContent>
        <Typography>{t('AddCompanyDialog.AddCompanyInfo')}</Typography>
        <TextField
          fullWidth
          margin="normal"
          label={t('AddCompanyDialog.Name')}
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label={t('AddCompanyDialog.Description')}
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Select
          fullWidth
          value={visibility}
          onChange={e => setVisibility(e.target.value)}
          margin="normal"
        >
          <MenuItem value="visible">{t('AddCompanyDialog.Visible')}</MenuItem>
          <MenuItem value="hidden">{t('AddCompanyDialog.Hidden')}</MenuItem>
        </Select>
      </DialogContent>
      {loading ? (
        <Typography>{t('AddCompanyDialog.Loading')}</Typography>
      ) : (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('AddCompanyDialog.Cancel')}
          </Button>
          <Button onClick={handleCreate} color="primary">
            {t('AddCompanyDialog.Create')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CreateCompanyDialog;
