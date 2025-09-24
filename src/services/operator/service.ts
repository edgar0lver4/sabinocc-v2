import FetchPetition from '..';
import { PhotoData } from '../../components/cameraFlux/types';
import {
  PropertyOperator,
  PropertyOpResponse,
} from '../../core/operator/types';
import { Proyect, ProyectResponse } from '../../core/proyects/type';
import { Ticket, TicketWarrantyResponse } from '../../core/tickets/types';
import store from '../../redux';
import { CATALOGS_URL, POSTSELLS_URL } from '../../utils/urls';

export const getProyectList = async (): Promise<Array<Proyect>> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const petition = await fetching.get(`${CATALOGS_URL}/GetListProjects`);
    const response: ProyectResponse = await petition.json();
    const data: Array<Proyect> = response.data;
    return data;
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};

export const getProperties = async (
  proyectId: number,
): Promise<PropertyOperator[]> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const url = `${CATALOGS_URL}/GetListProperties?id_proyecto=${proyectId}`;
    const petition = await fetching.get(url);
    const response: PropertyOpResponse = await petition.json();
    const data: Array<PropertyOperator> = response.data;
    if (data !== null) {
      return data;
    } else {
      throw Error('Sin propiedades en este proyecto');
    }
  } catch (e) {
    throw e;
  }
};

export const getOperatorTicketWarranty = async (
  propertyId: number,
): Promise<Ticket[]> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const url = `${POSTSELLS_URL}/GetTicketsWarrantyOperator?id_propiedad=${propertyId}`;
    const petition = await fetching.get(url);
    const response: TicketWarrantyResponse = await petition.json();
    const data: Array<Ticket> = response.data;
    if (data !== null) {
      return data;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
};

export const replyTicket = async (
  ticketId: number,
  photos: PhotoData[],
  comment: string,
): Promise<boolean> => {
  console.log(ticketId);
  try {
    const payloadComment = {
      id_ticket: ticketId,
      comment: comment,
    };
    const payloadPhotos = {
      id_ticket: ticketId,
      adjuntos: photos,
    };

    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const urlComment = `${POSTSELLS_URL}/AddComentTicketWarrantyOperator`;
    const urlPhotos = `${POSTSELLS_URL}/AddFileTicketWarrantyOperator`;
    const petition: Response = await fetching.post(urlComment, payloadComment);
    const petitionPhotos: Response = await fetching.post(
      urlPhotos,
      payloadPhotos,
    );
    if (petition.status === 200 && petitionPhotos.status === 200) {
      return true;
    }
  } catch (e) {
    throw e;
  }
  return false;
};

export const replyAndCloseTicket = async (
  ticketId: number,
  photos: PhotoData[],
  comment: string,
) => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const url = `${POSTSELLS_URL}/CloseTicketWarrantyOperator?id_ticket=${ticketId}`;
    const petition: Response = await fetching.patch(url);
    const reply = await replyTicket(ticketId, photos, comment);
    if (reply && petition.status === 200) return true;
  } catch (e) {
    throw e;
  }
  return false;
};
