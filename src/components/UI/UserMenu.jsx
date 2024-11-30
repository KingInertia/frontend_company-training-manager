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
import { logout } from '../../store/auth/authSlice';
import { selectAuthToken } from '../../store/auth/authSelectors';
import URLS from '../../constants/urls';

const UserMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { id } = useSelector(state => state.userProfile.user) || {};
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
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpirationTime');
    dispatch(logout());
    navigate('/');
  };

  const handleProfileNavigate = () => {
    handleCloseUserMenu();
    navigate(`${URLS.USERS}/${id}`);
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
        {authToken ? (
          [
            <MenuItem key="logout" onClick={handleLogoutNavigate}>
              <Typography sx={{ textAlign: 'center' }}>
                {t('UserMenu.logout')}
              </Typography>
            </MenuItem>,
            <MenuItem key="profile" onClick={handleProfileNavigate}>
              <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
            </MenuItem>,
          ]
        ) : (
          <MenuItem onClick={handleLoginNavigate}>
            <Typography sx={{ textAlign: 'center' }}>
              {t('UserMenu.login')}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default UserMenu;
