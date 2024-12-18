import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContainer from '../UI/PageContainer';
import DeleteCompanyDialog from '../UI/CompanyProfile/DeleteCompanyDialog';
import EditCompanyDialog from '../UI/CompanyProfile/EditCompanyDialog';
import CreateQuizModal from '../UI/CompanyProfile/Quizzes/CreateQuizModal';
import CompanyMembersList from '../UI/CompanyProfile/CompanyMembersList';
import CompanyAnalyticsModal from '../UI/CompanyProfile/Quizzes/analytics/CompanyAnalyticsModal';
import QuizList from '../UI/CompanyProfile/Quizzes/QuizList';
import { selectCompanies } from '../../store/companies/companiesSelectors';
import { selectRequests } from '../../store/companies/requests/requestsSelectors';
import {
  getCurrentCompany,
  isCompanyMember,
  leaveCompany,
} from '../../store/companies/companiesActions';
import { sendRequest } from '../../store/companies/requests/requestsActions';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import {
  listStates,
  manageStates,
  userRoleStates,
} from '../../constants/companyConst';

const CompanyProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [openDelDiag, setOpenDelDiag] = useState(false);
  const [openEditDiag, setOpenEditDiag] = useState(false);
  const [openLeaveDiag, setOpenLeaveDiag] = useState(false);
  const [openCreateQuiz, setOpenCreateQuiz] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [companyLeaveLoading, setCompanyLeaveLoading] = useState(false);
  const { t } = useTranslation();
  const { currentCompany, loading, error } = useSelector(selectCompanies);
  const [userRole, setUserRole] = useState('');
  const [listState, setListState] = useState(listStates.MEMBERS);
  const [manageState, setManageState] = useState('');
  const {
    loading: loadingRequest,
    error: errorRequest,
    success,
  } = useSelector(selectRequests);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const memberRole = await isCompanyMember(params.slug);

        if (memberRole) {
          setUserRole(memberRole);
        }
      } catch (error) {
        const errorMessage = error.response
          ? Object.values(error.response.data).join(' ')
          : error.message;
        dispatch(setSnackbarMessage(errorMessage));
      }
    };

    checkMembership();
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(
      getCurrentCompany({
        id: params.slug,
      }),
    );
  }, [dispatch, params]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    } else if (success) {
      dispatch(setSnackbarMessage(t('CompanyProfile.requestSent')));
    }
  }, [error, success, t, dispatch]);

  useEffect(() => {
    if (errorRequest) {
      dispatch(setSnackbarMessage(errorRequest));
    }
  }, [errorRequest, dispatch]);

  const handleLeaveCompany = async () => {
    setCompanyLeaveLoading(true);
    try {
      const message = await leaveCompany(params.slug);
      dispatch(setSnackbarMessage(message));
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));
    }
  };

  const handleSendRequest = async () => {
    await dispatch(sendRequest({ company: params.slug }));
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

  const handleChangeListState = () => {
    if (listState === listStates.MEMBERS) {
      setListState(listStates.ADMINS);
    } else {
      setManageState('');
      setListState(listStates.MEMBERS);
    }
  };

  return (
    <PageContainer>
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
              size={userRole === userRoleStates.OWNER ? 7 : 9}
              sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                padding: '8px',
                borderRadius: 1,
                border: '4px solid #e08e45',
              }}
            >
              <Typography variant="body1">
                {t('CompanyProfile.companyName')}: {currentCompany.name}
              </Typography>
              <Typography variant="body1">
                {t('CompanyProfile.owner')}: {currentCompany.owner}
              </Typography>
            </Grid>
            {userRole === userRoleStates.OWNER && (
              <Grid
                size={2}
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  padding: '8px',
                  borderRadius: 1,
                  border: '4px solid #e08e45',
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleOpenDelDiag}
                  sx={{
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
              </Grid>
            )}
            <Grid
              size={4}
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
                {userRole === userRoleStates.OWNER && (
                  <Typography variant="body1">
                    {t('CompanyProfile.companyVisibility')}:{' '}
                    {currentCompany.visibility}
                  </Typography>
                )}
              </>
            </Grid>
            <Grid
              size={6}
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
              <CompanyMembersList
                listState={listState}
                companyId={Number(params.slug)}
                membersManageState={manageState}
              />
              {userRole && (
                <QuizList
                  listState={listState}
                  companyId={Number(params.slug)}
                  manageState={manageState}
                />
              )}
            </Grid>
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
              <Button
                fullWidth
                variant="contained"
                onClick={handleChangeListState}
                sx={{
                  mb: 1,
                  backgroundColor: '#e08e45',
                  color: '#f9e2b2',
                }}
              >
                {listState === listStates.MEMBERS
                  ? t('CompanyProfile.AdminsList')
                  : t('CompanyProfile.MembersList')}
              </Button>
              {userRole && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setManageState('');
                    setListState(listStates.QUIZZES);
                  }}
                  sx={{
                    mb: 1,
                    backgroundColor: '#e08e45',
                    color: '#f9e2b2',
                  }}
                >
                  {t('QuizzesList.Quizzes')}
                </Button>
              )}

              {listState !== listStates.QUIZZES ? (
                <>
                  {userRole === userRoleStates.OWNER && (
                    <>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          manageState === manageStates.KICK
                            ? setManageState('')
                            : setManageState(manageStates.KICK)
                        }
                        sx={{
                          mb: 1,
                          backgroundColor:
                            manageState === manageStates.KICK
                              ? '#9e2a2f'
                              : '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {manageState === manageStates.KICK
                          ? t('CompanyProfile.Cancel')
                          : t('CompanyProfile.KickMember')}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          manageState === manageStates.APPOINT_ADMIN
                            ? setManageState('')
                            : setManageState(manageStates.APPOINT_ADMIN)
                        }
                        sx={{
                          mb: 1,
                          backgroundColor:
                            manageState === manageStates.APPOINT_ADMIN
                              ? '#738f45'
                              : '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {manageState === manageStates.APPOINT_ADMIN
                          ? t('CompanyProfile.Cancel')
                          : t('CompanyProfile.AppointAdmin')}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          manageState === manageStates.REMOVE_ADMIN
                            ? setManageState('')
                            : setManageState(manageStates.REMOVE_ADMIN)
                        }
                        sx={{
                          mb: 1,
                          backgroundColor:
                            manageState === manageStates.REMOVE_ADMIN
                              ? '#9e2a2f'
                              : '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {manageState === manageStates.REMOVE_ADMIN
                          ? t('CompanyProfile.Cancel')
                          : t('CompanyProfile.RemoveAdmin')}
                      </Button>
                    </>
                  )}{' '}
                </>
              ) : (
                <>
                  {(userRole === userRoleStates.OWNER ||
                    userRole === userRoleStates.ADMIN) && (
                    <>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setOpenCreateQuiz(true)}
                        sx={{
                          mb: 1,
                          backgroundColor: '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {t('CompanyProfile.CreateNewQuiz')}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setOpenAnalytics(true)}
                        sx={{
                          mb: 1,
                          backgroundColor: '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {t('CompanyProfile.OpenAnalytics')}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          manageState === manageStates.EDIT_QUIZ
                            ? setManageState('')
                            : setManageState(manageStates.EDIT_QUIZ)
                        }
                        sx={{
                          mb: 1,
                          backgroundColor:
                            manageState === manageStates.EDIT_QUIZ
                              ? '#9e2a2f'
                              : '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {manageState === manageStates.EDIT_QUIZ
                          ? t('CompanyProfile.CancelEditing')
                          : t('CompanyProfile.EditQuiz')}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          manageState === manageStates.REMOVE_QUIZ
                            ? setManageState('')
                            : setManageState(manageStates.REMOVE_QUIZ)
                        }
                        sx={{
                          mb: 1,
                          backgroundColor:
                            manageState === manageStates.REMOVE_QUIZ
                              ? '#9e2a2f'
                              : '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {manageState === manageStates.REMOVE_QUIZ
                          ? t('CompanyProfile.CancelRemove')
                          : t('CompanyProfile.RemoveQuiz')}
                      </Button>
                    </>
                  )}
                </>
              )}
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
              <CreateQuizModal
                onClose={() => setOpenCreateQuiz(false)}
                open={openCreateQuiz}
                companyId={currentCompany.id}
              />
              <CompanyAnalyticsModal
                onClose={() => setOpenAnalytics(false)}
                open={openAnalytics}
                companyId={currentCompany.id}
              />

              {userRole && userRole !== userRoleStates.OWNER && (
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
                  <Dialog
                    open={openLeaveDiag}
                    aria-labelledby="leave-company-dialog"
                  >
                    <DialogTitle id="leave-company-dialog">
                      {t('CompanyProfile.LeaveCompanyQuestion')}
                    </DialogTitle>
                    <DialogContent>
                      <Typography variant="body1">
                        {t('CompanyProfile.ConfirmLeaveCompany')}
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => setOpenLeaveDiag(false)}
                        color="primary"
                      >
                        {t('CompanyProfile.No')}
                      </Button>
                      <Button
                        onClick={handleLeaveCompany}
                        color="error"
                        variant="contained"
                      >
                        {t('CompanyProfile.Yes')}
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {companyLeaveLoading
                    ? t('CompanyProfile.leaveCompanyLoading')
                    : t('CompanyProfile.leaveCompany')}
                </Button>
              )}
              {!userRole && (
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loadingRequest}
                  onClick={handleSendRequest}
                  sx={{
                    mt: 1,
                    mb: 1,
                    backgroundColor: '#e08e45',
                    color: '#f9e2b2',
                  }}
                >
                  {loadingRequest
                    ? t('CompanyProfile.RequestSending')
                    : t('CompanyProfile.SendJoinRequest')}
                </Button>
              )}
            </Grid>
          </Grid>
        )
      )}
    </PageContainer>
  );
};

export default CompanyProfilePage;
