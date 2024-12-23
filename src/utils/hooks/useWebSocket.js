import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth/authSelectors';

import { addNotification } from '../../store/notifications/notificationSlice';

const useWebSocket = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    const socket = new WebSocket(
      `${process.env.REACT_APP_WS_BASE_URL}/ws/notifications/?token=${token}`,
    );

    socket.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data.type === 'new_notification') {
        const notification = data.notification;
        dispatch(addNotification(notification));
      }
    };

    return () => {
      socket.close();
    };
  }, [dispatch, token]);
};

export default useWebSocket;
