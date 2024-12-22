import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContainer from '../UI/PageContainer';
import DeleteAccoutDialog from '../UI/UserProfile/DeleteAccoutDialog';
import CreateCompanyDialog from '../UI/UserProfile/CreateCompanyDialog';
import InviteCompanyDialog from '../UI/UserProfile/InviteCompanyDialog';
import ProfileAnalyticsModal from '../UI/UserProfile/ProfileAnalyticsModal';
import ProfileLists from '../UI/UserProfile/Lists/ProfileLists';

import { getCurrentUser } from '../../store/users/usersActions';
import {
  updateUserProfile,
  getAvatar,
} from '../../store/userProfile/userProfileActions';
import { selectUserProfile } from '../../store/userProfile/userProfileSelectors';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';
import { useFetchUserRating } from '../../utils/hooks/userAnalyticsHooks';

const UsersProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDelDiag, setOpenDelDiag] = useState(false);
  const [openAddCompanyDiag, setOpenAddCompanyDiag] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [openInviteDiag, setOpenInviteDiag] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const { id } = useSelector(selectUserProfile) || {};
  const activeUserProfile = useSelector(state => state.userProfile);
  const viewedUserProfile = useSelector(state => state.users);
  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [rating, setRating] = useState(null);
  const { t } = useTranslation();
  const fetchUserRating = useFetchUserRating();

  const isActiveUser = Number(params.slug) === id;
  const userProfile = isActiveUser ? activeUserProfile : viewedUserProfile;
  const {
    loading,
    error,
    user = userProfile.currentUser || userProfile.user,
  } = userProfile;

  useEffect(() => {
    if (!isActiveUser) {
      dispatch(getCurrentUser({ id: params.slug }));
    }
  }, [isActiveUser, params.slug, dispatch]);

  useEffect(() => {
    async function ratingInfo() {
      const ratingInf = await fetchUserRating({ user_id: params.slug });
      if (ratingInf) {
        setRating((ratingInf.user_rating / 100) * 5);
      }
    }
    ratingInfo();
  }, [fetchUserRating, params.slug, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, navigate, dispatch]);

  const handleOpenDelDiag = () => {
    setOpenDelDiag(true);
  };

  const handleCloseDelDiag = () => {
    setOpenDelDiag(false);
  };

  const handleOpenAddCompanyDiag = () => {
    setOpenAddCompanyDiag(true);
  };

  const handleCloseAddCompanyDiag = () => {
    setOpenAddCompanyDiag(false);
  };

  const handleOpenInviteCompanyDiag = () => {
    setOpenInviteDiag(true);
  };

  const handleCloseInviteDiag = () => {
    setOpenInviteDiag(false);
  };

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  useEffect(() => {
    if (user && user.image_path) {
      try {
        const getImage = async () => {
          const url = await getAvatar(user.image_path);
          setImageUrl(url);
        };

        getImage();
      } catch (error) {
        const errorMessage = error.response
          ? Object.values(error.response.data).join(' ')
          : error.message;
        dispatch(setSnackbarMessage(errorMessage));
      }
    }
  }, [user, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const updatedFields = new FormData();

    updatedFields.append('first_name', data.get('first_name'));
    updatedFields.append('last_name', data.get('last_name'));
    updatedFields.append('email', data.get('email'));

    if (avatar) {
      updatedFields.append('image_path', avatar);
    }

    dispatch(updateUserProfile({ updatedFields }));
    setEditMod(false);
  };

  return (
    <PageContainer>
      {loading ? (
        <Typography>{t('UserProfile.Loading')}</Typography>
      ) : (
        user && (
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
                {imageUrl ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 'inherit',
                    }}
                  />
                ) : (
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
                      {user.username[0].toUpperCase()}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid
                size={isActiveUser ? 7 : 9}
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
                  {t('UserProfile.Login')}: {user.username}
                </Typography>
                <Typography variant="body1">
                  {t('UserProfile.Active')}:{' '}
                  {user.is_active ? t('UserProfile.Yes') : t('UserProfile.No')}
                </Typography>
                <Typography variant="body1">
                  Rating:{' '}
                  {rating !== null ? (
                    <Rating
                      name="rating"
                      value={rating}
                      precision={0.1}
                      readOnly
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#f9e2b2',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: 'gray',
                        },
                      }}
                    />
                  ) : (
                    'loading...'
                  )}
                </Typography>
              </Grid>
              {isActiveUser && (
                <Grid
                  size={2}
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
                    {t('UserProfile.DeleteAccount')}
                  </Button>
                  {!editMod ? (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setEditMod(true)}
                      sx={{
                        mb: 1,
                        backgroundColor: '#e08e45',
                        color: '#f9e2b2',
                      }}
                    >
                      {t('UserProfile.EditProfile')}
                    </Button>
                  ) : (
                    <div>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setEditMod(false)}
                        sx={{
                          mb: 1,
                          backgroundColor: '#e08e45',
                          color: '#f9e2b2',
                        }}
                      >
                        {t('UserProfile.CancelEdit')}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                          mb: 1,
                          backgroundColor: '#e08e45',
                          color: 'primary',
                        }}
                      >
                        {t('UserProfile.SaveEdit')}
                      </Button>
                      <Input
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarChange}
                        inputProps={{ accept: 'image/*' }}
                        sx={{ display: 'none' }}
                      />
                      <label htmlFor="avatar-upload">
                        <Button
                          fullWidth
                          variant="contained"
                          component="span"
                          sx={{
                            marginBottom: '8px',
                            backgroundColor: '#e08e45',
                            color: '#f9e2b2',
                          }}
                        >
                          {avatar
                            ? t('UserProfile.AvatarUploaded')
                            : t('UserProfile.UploadAvatar')}
                        </Button>
                      </label>
                    </div>
                  )}
                </Grid>
              )}
              <Grid
                size={3}
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
                    {t('UserProfile.ABOUT')}
                  </Typography>
                </Box>
                {!editMod ? (
                  <>
                    <Typography variant="body1">
                      {t('UserProfile.FirstName')}:{' '}
                      {user.first_name || t('UserProfile.NotProvided')}
                    </Typography>
                    <Typography variant="body1">
                      {t('UserProfile.LastName')}:{' '}
                      {user.last_name || t('UserProfile.NotProvided')}
                    </Typography>
                    <Typography variant="body1">
                      {t('UserProfile.Email')}: {user.email}
                    </Typography>
                    <Typography variant="body1">
                      {t('UserProfile.DateJoined')}:{' '}
                      {new Date(user.date_joined).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      {t('UserProfile.LastLogin')}:{' '}
                      {user.last_login
                        ? new Date(user.last_login).toLocaleString()
                        : t('UserProfile.Never')}
                    </Typography>
                  </>
                ) : (
                  <>
                    <TextField
                      label={t('UserProfile.FirstName')}
                      name="first_name"
                      variant="outlined"
                      defaultValue={user.first_name}
                      sx={{ marginBottom: '8px' }}
                      fullWidth
                    />
                    <TextField
                      label={t('UserProfile.LastName')}
                      name="last_name"
                      variant="outlined"
                      defaultValue={user.last_name}
                      sx={{ marginBottom: '8px' }}
                      fullWidth
                    />
                    <TextField
                      label={t('UserProfile.Email')}
                      name="email"
                      variant="outlined"
                      defaultValue={user.email}
                      sx={{ marginBottom: '8px' }}
                      fullWidth
                    />
                  </>
                )}
              </Grid>
              <Grid
                size={7}
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
                <ProfileLists isActiveUser={isActiveUser} />
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
                {isActiveUser ? (
                  <>
                    {' '}
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpenAddCompanyDiag()}
                      sx={{
                        mb: 1,
                        backgroundColor: '#e08e45',
                        color: '#f9e2b2',
                      }}
                    >
                      {t('UserProfile.AddCompany')}
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
                    <ProfileAnalyticsModal
                      onClose={() => setOpenAnalytics(false)}
                      open={openAnalytics}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpenInviteCompanyDiag()}
                      sx={{
                        mb: 1,
                        backgroundColor: '#e08e45',
                        color: '#f9e2b2',
                      }}
                    >
                      {t('UserProfile.InviteToCompany')}
                    </Button>
                    <InviteCompanyDialog
                      open={openInviteDiag}
                      handleClose={handleCloseInviteDiag}
                      userId={Number(params.slug)}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        )
      )}
      <DeleteAccoutDialog open={openDelDiag} handleClose={handleCloseDelDiag} />
      <CreateCompanyDialog
        open={openAddCompanyDiag}
        handleClose={handleCloseAddCompanyDiag}
      />
    </PageContainer>
  );
};

export default UsersProfilePage;
