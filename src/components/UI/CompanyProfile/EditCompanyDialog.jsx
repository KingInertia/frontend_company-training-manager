import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { updateCurrentCompany } from '../../../store/companies/companiesActions';

const EditCompanyDialog = ({ open, handleClose, company }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [visibility, setVisibility] = useState(company.visibility);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (name.trim() === '') {
      dispatch(setSnackbarMessage(t('EditCompanyDialog.FieldRequired')));
      return;
    }

    setLoading(true);
    await dispatch(
      updateCurrentCompany({
        updatedFields: { name, description, visibility },
        id: company.id,
      }),
    );
    setLoading(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('EditCompanyDialog.EditCompany')}</DialogTitle>
      <DialogContent>
        <Typography>{t('EditCompanyDialog.EditCompanyInfo')}</Typography>
        <TextField
          fullWidth
          margin="normal"
          label={t('EditCompanyDialog.Name')}
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label={t('EditCompanyDialog.Description')}
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
          <MenuItem value="visible">{t('EditCompanyDialog.Visible')}</MenuItem>
          <MenuItem value="hidden">{t('EditCompanyDialog.Hidden')}</MenuItem>
        </Select>
      </DialogContent>
      {loading ? (
        <Typography>{t('EditCompanyDialog.Loading')}</Typography>
      ) : (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('EditCompanyDialog.Cancel')}
          </Button>
          <Button onClick={handleSave} color="primary">
            {t('EditCompanyDialog.Save')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default EditCompanyDialog;
