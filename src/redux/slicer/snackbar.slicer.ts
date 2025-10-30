import { createSlice } from '@reduxjs/toolkit';
import { SnackbarProps } from '../../components/Snackbar/type';
import { showSnackbar } from '../actions/snackbar.actions';

const INITAL_STATE: SnackbarProps = {
  duration: 0,
  isVisible: false,
  message: '',
  variant: 'error',
};

const slicer = createSlice({
  initialState: INITAL_STATE,
  name: 'snackbar',
  reducers: {
    resetSnack: () => INITAL_STATE,
    showSnack: showSnackbar,
  },
});

export const { resetSnack, showSnack } = slicer.actions;
export default slicer.reducer;
