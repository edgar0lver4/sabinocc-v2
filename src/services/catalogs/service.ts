import FetchPetition from '..';
import store from '../../redux';
import {TCatalog} from '../../types/catalogs.type';
import {CATALOGS_URL} from '../../utils/urls';

export const getIncidentType = async (): Promise<Array<TCatalog>> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token);
    const petition: any = await fetching.get(
      `${CATALOGS_URL}/ListIncidentTypes`,
    );
    const response: any = await petition.json();
    const data: Array<TCatalog> = response.data;
    return data;
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};

export const getIncidentUbication = async (): Promise<Array<TCatalog>> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token);
    const petition: any = await fetching.get(
      `${CATALOGS_URL}/ListIncidentLocations`,
    );
    const response: any = await petition.json();
    const data: Array<TCatalog> = response.data;
    return data;
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};
