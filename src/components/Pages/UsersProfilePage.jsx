import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextPage from '../UI/TextPage';
import ErrorSnackbar from '../UI/ErrorSnackbar';
import DeleteAccoutDialog from '../UI/DeleteAccoutDialog';
import { getUser } from '../../store/users/users.Actions';
import {
  updateUserProfile,
  getAvatar,
} from '../../store/userProfile/userProfileActions';
import { selectAuthToken } from '../../store/auth/authSelectors';

const UsersProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDelDiag, setOpenDelDiag] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const { id } = useSelector(state => state.userProfile.user);
  const activeUserProfile = useSelector(state => state.userProfile);
  const randomUserProfile = useSelector(state => state.user);
  const authToken = useSelector(selectAuthToken);
  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const isActiveUser = Number(params.slug) === id;
  const currentUser = isActiveUser ? activeUserProfile : randomUserProfile;
  const { loading, error, user } = currentUser;

  useEffect(() => {
    if (!isActiveUser) {
      dispatch(getUser({ id: params.slug }));
    }
  }, [isActiveUser, params.slug, dispatch]);

  useEffect(() => {
    if (error) {
      if (error.includes('Request failed with status code 404')) {
        navigate('/NotFound');
      } else if (error === 'Network Error') {
        setSnackbarMessage('networkError');
      } else {
        setSnackbarMessage('unknownError');
      }
    }
  }, [error, navigate]);

  const handleOpenDelDiag = () => {
    setOpenDelDiag(true);
  };

  const handleCloseDelDiag = () => {
    setOpenDelDiag(false);
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
        const errorMessage = error.response?.data?.message || error.message;
        setSnackbarMessage(errorMessage);
      }
    }
  }, [user]);

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

    dispatch(updateUserProfile({ authToken, updatedFields }));
    setEditMod(false);
  };

  return (
    <TextPage>
      {loading ? (
        <Typography>Loading...</Typography>
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
                <Typography variant="body1">Login: {user.username}</Typography>
                <Typography variant="body1">
                  Active: {user.is_active ? 'Yes' : 'No'}
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
                    ABOUT
                  </Typography>
                </Box>
                {!editMod ? (
                  <>
                    <Typography variant="body1">
                      First Name: {user.first_name || 'Not Provided'}
                    </Typography>
                    <Typography variant="body1">
                      Last Name: {user.last_name || 'Not Provided'}
                    </Typography>
                    <Typography variant="body1">Email: {user.email}</Typography>
                    <Typography variant="body1">
                      Date Joined: {new Date(user.date_joined).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Last Login:{' '}
                      {user.last_login
                        ? new Date(user.last_login).toLocaleString()
                        : 'Never'}
                    </Typography>
                  </>
                ) : (
                  <>
                    <TextField
                      label="First Name"
                      name="first_name"
                      variant="outlined"
                      defaultValue={user.first_name}
                      sx={{ marginBottom: '8px' }}
                      fullWidth
                    />
                    <TextField
                      label="Last Name"
                      name="last_name"
                      variant="outlined"
                      defaultValue={user.last_name}
                      sx={{ marginBottom: '8px' }}
                      fullWidth
                    />
                    <TextField
                      label="Email"
                      name="email"
                      variant="outlined"
                      defaultValue={user.email}
                      sx={{ marginBottom: '8px' }}
                      fullWidth
                    />
                  </>
                )}
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
                    height: '540px',
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
                    Delete Account
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
                      Edit Profile
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
                        Cancel edit
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
                        Save edit
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
                          {avatar ? 'avatar uploaded' : 'Upload Avatar'}
                        </Button>
                      </label>
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
          </Box>
        )
      )}
      <ErrorSnackbar message={snackbarMessage} />
      <DeleteAccoutDialog
        setSnackbarMessage={setSnackbarMessage}
        open={openDelDiag}
        handleClose={handleCloseDelDiag}
      />
    </TextPage>
  );
};

export default UsersProfilePage;
