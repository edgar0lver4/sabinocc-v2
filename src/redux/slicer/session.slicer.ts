import { createSlice } from '@reduxjs/toolkit';
import {
  setHouseSelected,
  setSessionInfo,
  setProyectSelected,
  setProperties,
} from '../actions/session.actions';
import { TSession } from '../../types/session.types';

const INITIAL_STATE: TSession & { isLogin: boolean } = {
  type: '',
  token: '',
  name: '',
  image: '',
  email: '',
  properties: [],
  isLogin: false,
  selectedProperty: undefined,
  selectedProyect: undefined,
};

const sesionStore = createSlice({
  name: 'session',
  initialState: INITIAL_STATE,
  reducers: {
    closeSession: () => INITIAL_STATE,
    setSessionInfoRdx: setSessionInfo,
    setHouseSelectedRdx: setHouseSelected,
    setProyectSelectedRdx: setProyectSelected,
    setPropertiesRdx: setProperties,
  },
});

export const {
  closeSession,
  setSessionInfoRdx,
  setHouseSelectedRdx,
  setProyectSelectedRdx,
  setPropertiesRdx,
} = sesionStore.actions;
export default sesionStore.reducer;
