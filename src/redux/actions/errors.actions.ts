import { PayloadAction } from '@reduxjs/toolkit';

type TErrorSlicer = {
  isOpen: boolean;
  title: string;
  status: number;
};

export const showErrorModal = (
  state: TErrorSlicer,
  action: PayloadAction<TErrorSlicer>,
) => {
  state.isOpen = action.payload.isOpen;
  state.status = action.payload.status;
  state.title = action.payload.title;
};
