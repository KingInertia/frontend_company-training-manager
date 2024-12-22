import { useState } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
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
import useWebSocket from '../../utils/hooks/useWebSocket';

const Notifications = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications } = useSelector(selectNotifications) || {};

  const { markNotification } = useWebSocket();

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const markAsRead = (id, event) => {
    event.stopPropagation();
    markNotification(id);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Badge
          badgeContent={notifications.filter(n => n.status === 'unread').length}
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
                    textDecoration: status === 'read' ? 'line-through' : 'none',
                  }}
                />
                {status === 'unread' && (
                  <IconButton onClick={event => markAsRead(id, event)}>
                    <CheckIcon />
                  </IconButton>
                )}
              </ListItem>
            ))
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
