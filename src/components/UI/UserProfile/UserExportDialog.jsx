import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import axiosInstance from '../../../api/axiosInstance';
import { setSnackbarMessage } from '../../../store/UI/snackbarSlice';

const UserExportDialog = ({ open, handleClose, quizId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleExport = async fileType => {
    setLoading(true);
    try {
      const results = await axiosInstance.get(
        `/api/v1/quizzes/export-result/?result_id=${quizId}&file_type=${fileType}`,
        {
          responseType: 'blob',
        },
      );
      const url = window.URL.createObjectURL(new Blob([results.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `results.${fileType}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        dispatch(
          setSnackbarMessage(Object.values(error.response.data).join(' ')),
        );
      } else {
        dispatch(setSnackbarMessage(error.message));
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {loading ? (
        <DialogTitle>{'Exporting results..'}</DialogTitle>
      ) : (
        <>
          <DialogContent>
            <DialogTitle>{t('UserExportDialog.ExportQuizResult')}</DialogTitle>
            <Typography variant="h5">
              {t('UserExportDialog.ExportCurrentQuizResult')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleExport('csv')} color="primary">
              {t('UserExportDialog.ExportInCsvFormat')}
            </Button>
            <Button onClick={() => handleExport('json')} color="primary">
              {t('UserExportDialog.ExportInJsonFormat')}
            </Button>
            <Button onClick={handleClose} color="primary">
              {t('InvitationCompanyDialog.Cancel')}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default UserExportDialog;
