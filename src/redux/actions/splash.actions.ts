import { PayloadAction } from '@reduxjs/toolkit';

type State = {
  show: boolean;
  message: string;
  showLoader: boolean;
};
export const showSplashAct = (state: State, action: PayloadAction<State>) => {
  state = action.payload;
};
