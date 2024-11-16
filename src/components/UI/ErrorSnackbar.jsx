import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';

const ErrorSnackbar = ({ message }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (message) {
      setOpenSnackbar(true);
    }
  }, [message]);

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}
      message={message}
    />
  );
};

export default ErrorSnackbar;
