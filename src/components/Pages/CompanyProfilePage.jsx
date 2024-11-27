import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextPage from '../UI/TextPage';
import DeleteCompanyDialog from '../UI/CompanyProfile/DeleteCompanyDialog';
import EditCompanyDialog from '../UI/CompanyProfile/EditCompanyDialog';
import { selectUserProfile } from '../../store/userProfile/userProfileSelectors';
import {
  getCurrentCompany,
  isCompanyMember,
  leaveCompany,
} from '../../store/companies/companiesActions';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';

const CompanyProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [openDelDiag, setOpenDelDiag] = useState(false);
  const [openEditDiag, setOpenEditDiag] = useState(false);
  const [isUserCompanyMember, setIsUserCompanyMember] = useState(false);
  const [companyLeaveLoading, setCompanyLeaveLoading] = useState(false);
  const { t } = useTranslation();
  const { id } = useSelector(selectUserProfile);
  const { currentCompany, loading, error } = useSelector(
    state => state.companies,
  );
  const isCompanyOwner = currentCompany ? currentCompany.owner === id : false;

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const isMember = await isCompanyMember(params.slug);
        setIsUserCompanyMember(isMember);
      } catch (error) {
        const errorMessage = error.response
          ? Object.values(error.response.data).join(' ')
          : error.message;
        dispatch(setSnackbarMessage(errorMessage));
      }
    };

    checkMembership();
  }, [dispatch, params.slug]);

  useEffect(() => {
    dispatch(getCurrentCompany({ id: params.slug }));
  }, [dispatch, params]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  const handleLeaveCompany = async () => {
    setCompanyLeaveLoading(true);
    try {
      const message = await leaveCompany(params.slug);
      setSnackbarMessage(message);
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      setSnackbarMessage(errorMessage);
    }
  };

  const handleOpenDelDiag = () => {
    setOpenDelDiag(true);
  };

  const handleCloseDelDiag = () => {
    setOpenDelDiag(false);
  };

  const handleCloseEditDiag = () => {
    setOpenEditDiag(false);
  };

  return (
    <TextPage>
      {loading ? (
        <Typography>{t('CompanyProfile.loading')}</Typography>
      ) : (
        currentCompany && (
          <Grid
            container
            spacing={1}
            sx={{
              display: 'flex',
              flexGrow: 1,
            }}
          >
            <Grid
              size={3}
              sx={{
                display: 'flex',
                flexGrow: 1,
                padding: '8px',
                borderRadius: 1,
                border: '4px solid #e08e45',
                aspectRatio: '1 / 1',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'inherit',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '18rem',
                    fontWeight: 'bold',
                    color: '#f9e2b2',
                  }}
                >
                  {currentCompany.name[0].toUpperCase()}
                </Typography>
              </Box>
            </Grid>
            <Grid
              size={9}
              sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                padding: '8px',
                borderRadius: 1,
                border: '4px solid #e08e45',
                height: '290px',
              }}
            >
              <Typography variant="body1">
                {t('CompanyProfile.companyName')}: {currentCompany.name}
              </Typography>
              <Typography variant="body1">
                {t('CompanyProfile.owner')}: {currentCompany.owner}
              </Typography>
            </Grid>
            <Grid
              size={10}
              sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                padding: '8px',
                borderRadius: 1,
                border: '4px solid #e08e45',
                height: '540px',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#e08e45',
                  padding: '8px',
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: '16px',
                }}
              >
                <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
                  {t('CompanyProfile.aboutCompany')}
                </Typography>
              </Box>
              <>
                <Typography variant="body1">
                  {t('CompanyProfile.description')}:{' '}
                  {currentCompany.description || t('noDescription')}
                </Typography>
                <Typography variant="body1">
                  {t('CompanyProfile.dateCreated')}: {currentCompany.created_at}
                </Typography>
                <Typography variant="body1">
                  {t('CompanyProfile.dateUpdated')}: {currentCompany.updated_at}
                </Typography>
                {isCompanyOwner && (
                  <Typography variant="body1">
                    {t('CompanyProfile.companyVisibility')}:{' '}
                    {currentCompany.visibility}
                  </Typography>
                )}
              </>
            </Grid>
            {(isCompanyOwner || isUserCompanyMember) && (
              <Grid
                size={2}
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  padding: '8px',
                  borderRadius: 1,
                  border: '4px solid #e08e45',
                  height: '540px',
                }}
              >
                {isCompanyOwner && (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleOpenDelDiag}
                      sx={{
                        mt: 1,
                        mb: 1,
                        backgroundColor: '#e08e45',
                        color: '#f9e2b2',
                      }}
                    >
                      {t('CompanyProfile.deleteCompany')}
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setOpenEditDiag(true)}
                      sx={{
                        mb: 1,
                        backgroundColor: '#e08e45',
                        color: '#f9e2b2',
                      }}
                    >
                      {t('CompanyProfile.editCompany')}
                    </Button>
                    <DeleteCompanyDialog
                      open={openDelDiag}
                      handleClose={handleCloseDelDiag}
                      id={currentCompany.id}
                      companyName={currentCompany.name}
                    />
                    <EditCompanyDialog
                      open={openEditDiag}
                      handleClose={handleCloseEditDiag}
                      company={currentCompany}
                    />
                  </>
                )}
                {isUserCompanyMember && (
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={companyLeaveLoading}
                    onClick={handleLeaveCompany}
                    sx={{
                      mt: 1,
                      mb: 1,
                      backgroundColor: '#e08e45',
                      color: '#f9e2b2',
                    }}
                  >
                    {companyLeaveLoading
                      ? t('CompanyProfile.leaveCompanyLoading')
                      : t('CompanyProfile.leaveCompany')}
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        )
      )}
    </TextPage>
  );
};

export default CompanyProfilePage;
