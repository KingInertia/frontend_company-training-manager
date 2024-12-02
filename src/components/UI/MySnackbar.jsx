import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../../store/UI/snackbarSlice';

const MySnackbar = () => {
  const dispatch = useDispatch();
  const { message, open } = useSelector(state => state.snackbar);

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}
      message={message}
    />
  );
};

export default MySnackbar;
