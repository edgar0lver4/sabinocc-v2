import { createSlice } from '@reduxjs/toolkit';
import { OperatorStore } from '../../core/operator/types';
import {
  selectOperatorProperty,
  selectTicket,
  setOperatorProperties,
} from '../actions/operator.actions';

const INITIAL_STATE: OperatorStore = {
  email: '',
  porperties: [],
  selectedProperty: undefined,
  selectedTicket: undefined,
};

const operatorStore = createSlice({
  name: 'operator',
  initialState: INITIAL_STATE,
  reducers: {
    resetOperatorStore: () => INITIAL_STATE,
    setOperatorPropertiesRdx: setOperatorProperties,
    selectOperatorPropertyRdx: selectOperatorProperty,
    selectTicketRdx: selectTicket,
  },
});

export const {
  resetOperatorStore,
  selectOperatorPropertyRdx,
  setOperatorPropertiesRdx,
  selectTicketRdx,
} = operatorStore.actions;
export default operatorStore.reducer;
