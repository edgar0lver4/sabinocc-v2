import { Ticket } from '../tickets/types';

export type PropertyOperator = {
  id: number;
  prototipo: string;
  numero: string;
};

export type PropertyOpResponse = {
  data: PropertyOperator[];
};

export type OperatorStore = {
  porperties: PropertyOperator[];
  email: string;
  selectedProperty?: PropertyOperator;
  selectedTicket?: Ticket;
};
