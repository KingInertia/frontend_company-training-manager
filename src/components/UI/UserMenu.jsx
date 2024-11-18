import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../../store/auth/authActions';
import { removeUserToken } from '../../store/auth/authSlice';
import ErrorSnackbar from './ErrorSnackbar';
import { selectUserToken } from '../../store/auth/authSelectors';
import URLS from '../../constants/urls';

const UserMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const userToken = useSelector(selectUserToken);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginNavigate = () => {
    handleCloseUserMenu();
    navigate(URLS.LOGIN);
  };

  const handleLogoutNavigate = async () => {
    if (userToken) {
      try {
        await logoutUser(userToken);
        dispatch(removeUserToken());
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenTimestamp');
        navigate('/');
      } catch (error) {
        setSnackbarMessage(error);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 0, ml: '10px' }}>
      <Tooltip title={t('UserMenu.settings')}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="user" src="/static/images/avatar/" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userToken ? (
          <MenuItem onClick={handleLogoutNavigate}>
            <Typography sx={{ textAlign: 'center' }}>
              {t('UserMenu.logout')}
            </Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLoginNavigate}>
            <Typography sx={{ textAlign: 'center' }}>
              {t('UserMenu.login')}
            </Typography>
          </MenuItem>
        )}
      </Menu>
      <ErrorSnackbar message={snackbarMessage} />
    </Box>
  );
};

export default UserMenu;
