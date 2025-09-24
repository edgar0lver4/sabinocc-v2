import {TOptions} from './select.type';

export type TReport = {
  numTicket: string;
  tipoArea: string;
  tipoReporte: string;
  descripcion: string;
  createDate: string;
  modificationDate: string;
  evaluationDate: string | null;
  closed: boolean;
  closedDate: string | null;
  nextWorkDate: string | null;
  files?: Array<any>;
};

export type TNotification = {
  title: string;
  idWarranty: string;
  description: string;
  createDate: string;
  status: string;
};

export type TImageForm = {
  name: string;
  type: string;
  uri: string;
};

export type TFormikReport = {
  area_vivienda: TOptions;
  tipo_reporte: TOptions;
  descripcion: string;
  horario_cliente_1: string;
  horario_cliente_2: string;
  horario_cliente_3: string;
  adjuntos: Array<any> | null;
};
