import {PayloadAction} from '@reduxjs/toolkit';

export const showGlobalLoader = (
  state: {isOpen: boolean; title: string},
  action: PayloadAction<{isOpen: boolean; title: string}>,
) => {
  state.isOpen = action.payload.isOpen;
  state.title = action.payload.title;
};
