import store from '../../../../redux';
import { ReportRequest } from '../../../../services/reports/types';
import { TFormikReport } from '../../../../types/report.type';

export const generateDTOReport = (data: TFormikReport): ReportRequest => {
  const h1 = data.horario_cliente_1 === '' ? null : data.horario_cliente_1;
  const h2 = data.horario_cliente_2 === '' ? null : data.horario_cliente_2;
  const h3 = data.horario_cliente_3 === '' ? null : data.horario_cliente_3;

  const house = store.getState().session.selectedProperty;
  const houseId = house?.id || 0;

  const payload = {
    id_area_vivienda: data.area_vivienda.value,
    id_tipo_reporte: data.tipo_reporte.value,
    descripcion: data.descripcion,
    horario_cliente_1: h1,
    horario_cliente_2: h2,
    horario_cliente_3: h3,
    adjuntos: data.adjuntos,
    id_propiedad: houseId,
  };
  return payload;
};
