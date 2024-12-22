import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth/authSelectors';
import { setSnackbarMessage } from '../../store/UI/snackbarSlice';

import {
  setNotifications,
  addNotification,
  markNotificationAsRead,
} from '../../store/notifications/notificationSlice';

const useWebSocket = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const socket = new WebSocket(
      `ws://localhost:8000/ws/notifications/?token=${token}`,
    );
    setSocket(socket);

    socket.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data.type === 'notification_list') {
        dispatch(setNotifications(data.notifications));
      }

      if (data.type === 'new_notification') {
        const notification = data.notification;
        dispatch(addNotification(notification));
      }

      if (data.type === 'change_status') {
        if (data.status === 'unread') {
          dispatch(setSnackbarMessage(data.message));
        } else {
          dispatch(markNotificationAsRead(data.notification_id));
        }
      }
    };

    return () => {
      socket.close();
    };
  }, [dispatch, token]);

  const markNotification = notificationId => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ notification_id: notificationId }));
    }
  };

  return { markNotification };
};

export default useWebSocket;
