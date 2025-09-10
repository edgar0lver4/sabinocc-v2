export type Schedule = {
  id: number;
  hora_fin: string;
  comentario: string;
  dia_semana: number;
  hora_inicio: string;
  id_proyecto: string;
  fecha_especifica: string;
  tipo_disponibilidad: string;
};

export type ScheduleResponse = {
  data: Array<Schedule>;
};
