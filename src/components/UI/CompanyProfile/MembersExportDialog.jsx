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
import { downloadFile } from '../../../utils/downloadFileUtil';

const MembersExportDialog = ({ open, handleClose, member, companyId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleExport = async fileType => {
    setLoading(true);

    const params = { company_id: companyId, file_type: fileType };
    if (member) params.user_id = member.user;

    try {
      const response = await axiosInstance.get(
        `/api/v1/quizzes/export-company-results/`,
        {
          params,
          responseType: 'blob',
        },
      );
      downloadFile(response.data, `results.${fileType}`);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));

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
            <DialogTitle>{t('MembersExportDialog.ExportResults')}</DialogTitle>
            <Typography variant="h5">
              {member
                ? `${t('MembersExportDialog.ExportCurrentUserResults')} ${member.user_name}`
                : t('MembersExportDialog.ExportAllUsersResults')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleExport('csv')} color="primary">
              {t('MembersExportDialog.ExportInCsvFormat')}
            </Button>
            <Button onClick={() => handleExport('json')} color="primary">
              {t('MembersExportDialog.ExportInJsonFormat')}
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

export default MembersExportDialog;
