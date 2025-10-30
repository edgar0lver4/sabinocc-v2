import { Alert } from 'react-native';
import FetchPetition from '..';
import store from '../../redux';
import { TFormikReport, TNotification, TReport } from '../../types/report.type';
import { POSTSELLS_URL } from '../../utils/urls';
import { showErrorModalRdx } from '../../redux/slicer/errors.slicer';
import { ReportRequest } from './types';

export const getReportService = async (): Promise<Array<TReport>> => {
  try {
    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;
    const fetching = new FetchPetition(token, true);
    const petition: any = await fetching.get(
      `${POSTSELLS_URL}/GetTicketsWarranty?id_propiedad=${houseId}`,
    );
    const response: any = await petition.json();
    const data: Array<TReport> = response.data;
    if (!!data) {
      return data;
    }
    return [];
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};

export const getReptNotService = async (): Promise<Array<TNotification>> => {
  try {
    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;
    const fetching = new FetchPetition(token, true);
    const petition: any = await fetching.get(
      `${POSTSELLS_URL}/GetNotificationsTicketsWarranty?id_propiedad=${houseId}`,
    );
    const response: any = await petition.json();
    const data: Array<TNotification> = response.data;
    if (!!data) {
      return data;
    }
    return [];
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};

export const getReportById = async (id: string): Promise<TReport[] | null> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const petition: any = await fetching.get(
      `${POSTSELLS_URL}/GetTicketWarranty?folio=${id}`,
    );
    const response: any = await petition.json();
    const data: TReport[] = response.data;
    if (!!data) {
      return data;
    }
    return null;
  } catch (e) {
    throw e;
  }
};

/**
 *@deprecated use  createReportSeriviceV2
 */
export const createReportSerivice = async (
  data: TFormikReport,
): Promise<null | { id: string; error: string; status: number }> => {
  try {
    const h1 = data.horario_cliente_1 === '' ? null : data.horario_cliente_1;
    const h2 = data.horario_cliente_2 === '' ? null : data.horario_cliente_2;
    const h3 = data.horario_cliente_3 === '' ? null : data.horario_cliente_3;

    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;

    const header = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-API-Version': 2.0,
    };
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
    const request = await fetch(`${POSTSELLS_URL}/AddTicketWarrantyB64`, {
      headers: header,
      body: JSON.stringify([payload]),
      method: 'POST',
    });
    const id = await request.text();
    if (request.status === 200) {
      return { id: id, error: '', status: request.status };
    } else {
      store.dispatch(
        showErrorModalRdx({ isOpen: true, title: id, status: request.status }),
      );
    }
    return { id: '', error: id, status: request.status };
  } catch (e) {
    console.log('Error en el servicio createReportSerivice:', e);
    store.dispatch(
      showErrorModalRdx({ isOpen: true, title: String(e), status: 0 }),
    );
    return null;
  }
};

export const createReportSeriviceV2 = async (
  data: ReportRequest[],
): Promise<null | { id: string; error: string; status: number }> => {
  try {
    const token = store.getState().session.token;
    const header = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-API-Version': 2.0,
    };
    console.log('val:', data);
    const request = await fetch(`${POSTSELLS_URL}/AddTicketWarrantyB64`, {
      headers: header,
      body: JSON.stringify(data),
      method: 'POST',
    });
    const id = await request.text();
    if (request.status === 200) {
      return { id: id, error: '', status: request.status };
    } else {
      store.dispatch(
        showErrorModalRdx({ isOpen: true, title: id, status: request.status }),
      );
    }
    return { id: '', error: id, status: request.status };
  } catch (e) {
    console.log('Error en el servicio createReportSerivice:', e);
    store.dispatch(
      showErrorModalRdx({ isOpen: true, title: String(e), status: 0 }),
    );
    return null;
  }
};
