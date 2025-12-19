import { createSlice } from '@reduxjs/toolkit';
import { showSplashAct } from '../actions/splash.actions';

const INITIAL_STATE = {
  show: true,
  message: 'Cargando información',
  showLoader: true,
};

const splashStore = createSlice({
  initialState: INITIAL_STATE,
  name: 'splash',
  reducers: {
    resetSc: () => INITIAL_STATE,
    hiddeSc: () => ({
      show: false,
      message: '',
      showLoader: false,
    }),
    showSc: showSplashAct,
  },
});

export const { resetSc, showSc, hiddeSc } = splashStore.actions;
export default splashStore.reducer;
