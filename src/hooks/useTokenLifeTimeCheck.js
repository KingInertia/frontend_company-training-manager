import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth/loginSlice';

const useTokenLifeTimeCheck = () => {
  const dispatch = useDispatch();
  const [isExpired, setIsExpired] = useState(false);
  const tokenTimestamp = useSelector(state => state.login.tokenTimestamp);
  const tokenExpirationTime = 3600 * 1000; // 1 hour

  useEffect(() => {
    if (tokenTimestamp) {
      const tokenLifeTime = Date.now() - tokenTimestamp;
      if (tokenLifeTime > tokenExpirationTime) {
        dispatch(logout());
        setIsExpired(true);
      } else {
        setIsExpired(false);
      }
    } else {
      setIsExpired(true);
    }
  }, [tokenTimestamp, dispatch, tokenExpirationTime]);
  return isExpired;
};

export default useTokenLifeTimeCheck;
