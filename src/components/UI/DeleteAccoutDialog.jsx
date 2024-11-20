import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { delUserProfile } from '../../store/userProfile/userProfileActions';
import { removeAuthToken } from '../../store/auth/authSlice';

const DeleteAccoutDialog = ({
  open,
  handleClose,
  setSnackbarMessage,
  authToken,
}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (password !== '') {
      setLoading(true);
      try {
        await delUserProfile({ authToken: authToken, password: password });
        dispatch(removeAuthToken());
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenTimestamp');
      } catch (error) {
        setSnackbarMessage(error);
        const errorMessage = error.response?.data?.message || error.message;
        setSnackbarMessage(errorMessage);
      }
      setLoading(false);
    } else {
      setSnackbarMessage('Введіть пароль для підтверждения особистості');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Видалити профіль</DialogTitle>
      <DialogContent>
        <Typography>Введіть пароль для підтверждения особистості</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="password'"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDelete} color="error">
            Удалить
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DeleteAccoutDialog;
