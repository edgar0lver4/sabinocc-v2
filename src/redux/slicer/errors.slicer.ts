import { createSlice } from '@reduxjs/toolkit';
import { showErrorModal } from '../actions/errors.actions';

const INITIAL_STATE = {
  isOpen: false,
  title: '',
  status: 0,
};

const errorStore = createSlice({
  name: 'errors',
  initialState: INITIAL_STATE,
  reducers: {
    closeError: () => INITIAL_STATE,
    showErrorModalRdx: showErrorModal,
  },
});

export const { closeError, showErrorModalRdx } = errorStore.actions;
export default errorStore.reducer;
