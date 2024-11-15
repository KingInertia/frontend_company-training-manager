import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth/authActions';

const useTokenLifeTimeCheck = () => {
  const dispatch = useDispatch();
  const [isExpired, setIsExpired] = useState(false);
  const { tokenTimestamp, userToken } = useSelector(state => state.login);
  const tokenExpirationTime = 3600 * 1000; // 1 hour

  useEffect(() => {
    if (tokenTimestamp) {
      const tokenLifeTime = Date.now() - tokenTimestamp;
      if (tokenLifeTime > tokenExpirationTime) {
        dispatch(logoutUser({ userToken: userToken }));
        setIsExpired(true);
      } else {
        setIsExpired(false);
      }
    } else {
      setIsExpired(true);
    }
  }, [tokenTimestamp, dispatch, tokenExpirationTime, userToken]);
  return isExpired;
};

export default useTokenLifeTimeCheck;
