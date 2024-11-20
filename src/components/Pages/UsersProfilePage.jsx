import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextPage from '../UI/TextPage';
import ErrorSnackbar from '../UI/ErrorSnackbar';
import DeleteAccoutDialog from '../UI/DeleteAccoutDialog';
import { getUser } from '../../store/users/users.Actions';
import { getUserProfile } from '../../store/userProfile/userProfileActions';

const UsersProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDelDiag, setOpenDelDiag] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(null);

  const { userToken } = useSelector(state => state.login);
  const { id } = useSelector(state => state.userProfile.user) || {};
  const activeUserProfile = useSelector(state => state.userProfile);
  const userProfile = useSelector(state => state.user);

  let currentUser = { loading: true };

  if (id) {
    currentUser = isActiveUser ? activeUserProfile : userProfile;
  }

  const { loading, error, user } = currentUser;

  useEffect(() => {
    dispatch(getUserProfile({ userToken: userToken }));
  }, [userToken, dispatch]);

  useEffect(() => {
    if (id) {
      if (Number(params.slug) === id) {
        setIsActiveUser(true);
      } else {
        setIsActiveUser(false);
      }
    }
  }, [id, params.slug]);

  useEffect(() => {
    if (isActiveUser === false) {
      dispatch(getUser({ id: params.slug }));
    }
  }, [dispatch, params, id, isActiveUser]);

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

  return (
    <TextPage>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        user && (
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
                height: '360px',
              }}
            ></Grid>
            <Grid
              size={9}
              sx={{
                display: 'flex',
                flexGrow: 1,
                padding: '8px',
                borderRadius: 1,
                border: '4px solid #e08e45',
                height: '360px',
              }}
            >
              <Typography variant="body1">
                Login: {user.username}
                <br />
                Post: {user.email}
                <br />
                Registration date: {user.created_at}
                <br />
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
                height: '460px',
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
              <Typography variant="body1">
                Login: ЕТОТ КОМПОНЕНТ Grid НАДО ВМЕСТИТЬ
                <br />
                Post:
                <br />
                Registration date:
                <br />
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
                  height: '460px',
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
                      onClick={() => setEditMod(false)}
                      sx={{
                        mb: 1,
                        backgroundColor: '#e08e45',
                        color: 'primary',
                      }}
                    >
                      Save edit
                    </Button>
                  </div>
                )}
              </Grid>
            )}
          </Grid>
        )
      )}
      <ErrorSnackbar message={snackbarMessage} />
      <DeleteAccoutDialog
        open={openDelDiag}
        handleClose={handleCloseDelDiag}
        userToken={userToken}
      />
    </TextPage>
  );
};

export default UsersProfilePage;
