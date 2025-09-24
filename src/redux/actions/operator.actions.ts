import { PayloadAction } from '@reduxjs/toolkit';
import { OperatorStore, PropertyOperator } from '../../core/operator/types';
import { Ticket } from '../../core/tickets/types';

export const setOperatorProperties = (
  state: OperatorStore,
  action: PayloadAction<PropertyOperator[]>,
) => {
  state.porperties = action.payload;
};

export const selectOperatorProperty = (
  state: OperatorStore,
  action: PayloadAction<PropertyOperator>,
) => {
  state.selectedProperty = action.payload;
};

export const selectTicket = (
  state: OperatorStore,
  action: PayloadAction<Ticket>,
) => {
  state.selectedTicket = action.payload;
};
