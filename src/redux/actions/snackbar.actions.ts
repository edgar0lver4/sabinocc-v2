import { PayloadAction } from '@reduxjs/toolkit';
import { SnackbarProps } from '../../components/Snackbar/type';

export const showSnackbar = (
  state: SnackbarProps,
  action: PayloadAction<{
    duration: number;
    message: string;
    variant: 'success' | 'error';
  }>,
) => {
  state.isVisible = true;
  state.duration = action.payload.duration;
  state.message = action.payload.message;
  state.variant = action.payload.variant;
};
