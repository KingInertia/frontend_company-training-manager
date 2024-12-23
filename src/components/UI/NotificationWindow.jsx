import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { selectNotifications } from '../../store/notifications/notificationSelectors';

const NotificationWindow = () => {
  const { t } = useTranslation();
  const { lastNotification } = useSelector(selectNotifications) || {};
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lastNotification) {
      setOpen(true);
    }
  }, [lastNotification]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={20000}
    >
      <Card
        style={{
          backgroundColor: '#e5ab6c',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            {t('NotificationWindow.NewNotification')}
          </Typography>

          <Typography variant="body2" style={{ marginTop: '8px' }}>
            {lastNotification && lastNotification.text}
          </Typography>
        </CardContent>
      </Card>
    </Snackbar>
  );
};

export default NotificationWindow;
