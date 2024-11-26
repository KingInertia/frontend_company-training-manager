import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    message: '',
    open: false,
  },
  reducers: {
    setSnackbarMessage(state, action) {
      state.message = action.payload;
      state.open = true;
    },
    closeSnackbar(state) {
      state.open = false;
      state.message = '';
    },
  },
});

export const { setSnackbarMessage, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
