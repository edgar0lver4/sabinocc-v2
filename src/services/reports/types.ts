export type ReportRequest = {
  id_area_vivienda: string | number | boolean;
  id_tipo_reporte: string | number | boolean;
  descripcion: string;
  horario_cliente_1: string | null;
  horario_cliente_2: string | null;
  horario_cliente_3: string | null;
  adjuntos: any[] | null;
  id_propiedad: number;
};

type ReportResponseFiles = {
  name: string;
  url: string;
  fec_alta: string;
};

export type ReportResponse = {
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
  files: ReportResponseFiles[];
};
