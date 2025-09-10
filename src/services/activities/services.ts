import FetchPetition from '..';
import store from '../../redux';
import { ACTIVITIES_URL } from '../../utils/urls';
import { TActivitiesResponse, TActivity } from './services.type';

export const getActivitiesList = async (): Promise<Array<TActivity>> => {
  try {
    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;

    const fetching = new FetchPetition(token, true);
    const petition: any = await fetching.get(
      `${ACTIVITIES_URL}/ListActivities?id_propiedad=${houseId}`,
    );
    const response: TActivitiesResponse = await petition.json();
    const data: Array<TActivity> = response.data;
    if (!!data) return data;
    return [];
  } catch (e) {
    return [];
  }
};

export const getActivityById = async (
  id: number,
): Promise<TActivity | undefined> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token);
    const petition: any = await fetching.get(
      `${ACTIVITIES_URL}/Activity?id=${id}`,
    );
    const response: { data: TActivity } = await petition.json();
    const data: TActivity = response.data;
    return data;
  } catch (e) {
    return undefined;
  }
};

export const subscribeActivityById = async (id: number) => {
  const token = store.getState().session.token;
  try {
    const header = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-API-Version': 2.0,
    };
    const request = await fetch(
      `${ACTIVITIES_URL}/SubscribeActivity?id_activity=${id}`,
      {
        headers: header,
        method: 'POST',
      },
    );
    if (request.status === 200) return true;
    return false;
  } catch (e) {
    return false;
  }
};
