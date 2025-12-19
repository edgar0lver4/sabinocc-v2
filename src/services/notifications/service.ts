import FetchPetition from '..';
import {
  Notification,
  NotificationResponse,
} from '../../core/notifications/types';
import store from '../../redux';
import { POSTSELLS_URL } from '../../utils/urls';

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token, true);
    const petition = await fetching.get(
      `${POSTSELLS_URL}/GetNotifications?id_propiedad`,
    );
    const response: NotificationResponse = await petition.json();
    const data: Array<Notification> = response.data;
    if (!!data) return data;
    return [];
  } catch (e) {
    throw e;
  }
};
