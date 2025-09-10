import {createSlice} from '@reduxjs/toolkit';
import {showGlobalLoader} from '../actions/loader.actions';

const INITIAL_STATE = {
  isOpen: false,
  title: '',
};

const loaderStore = createSlice({
  name: 'loader',
  initialState: INITIAL_STATE,
  reducers: {
    closeLoader: () => INITIAL_STATE,
    showLoaderRdx: showGlobalLoader,
  },
});

export const {closeLoader, showLoaderRdx} = loaderStore.actions;
export default loaderStore.reducer;
