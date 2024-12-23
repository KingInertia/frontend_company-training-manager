import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { selectNotifications } from '../../store/notifications/notificationSelectors';
import {
  fetchNotifications,
  markNotificationAsRead,
} from '../../store/notifications/notificationActions';
import useWebSocket from '../../utils/hooks/useWebSocket';
import { notificationStatus } from '../../constants/notificationStatus';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';

const Notifications = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, error, loading } =
    useSelector(selectNotifications) || {};

  useWebSocket();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const markAsRead = (id, event) => {
    event.stopPropagation();
    dispatch(markNotificationAsRead({ notification_id: id }));
  };

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Badge
          badgeContent={
            notifications.filter(n => n.status === notificationStatus.UNREAD)
              .length
          }
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            style: { maxHeight: 200, width: 300 },
          },
        }}
      >
        <List>
          {notifications.length > 0 ? (
            notifications.map(({ id, text, status, created_at }) => (
              <ListItem key={id} button onClick={handleCloseMenu}>
                <ListItemText
                  primary={text}
                  secondary={format(new Date(created_at), 'HH:mm dd.MM.yy')}
                  style={{
                    textDecoration:
                      status === notificationStatus.READ
                        ? 'line-through'
                        : 'none',
                  }}
                />
                {status === notificationStatus.UNREAD && (
                  <IconButton onClick={event => markAsRead(id, event)}>
                    <CheckIcon />
                  </IconButton>
                )}
              </ListItem>
            ))
          ) : loading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            <MenuItem disabled>
              {t('Notifications.NoNewNotifications')}
            </MenuItem>
          )}
        </List>
      </Menu>
    </>
  );
};

export default Notifications;
