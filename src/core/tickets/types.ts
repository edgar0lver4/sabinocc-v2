export type Ticket = {
  id: number;
  numTicket: string;
  tipoArea: string;
  tipoReporte: string;
  descripcion: string;
  createDate: string;
  modificationDate: string;
  evaluationDate: string;
  closed: boolean;
  closedDate: string | null;
  nextWorkDate: string | null;
};

export type TicketWarrantyResponse = {
  data: Ticket[];
};
