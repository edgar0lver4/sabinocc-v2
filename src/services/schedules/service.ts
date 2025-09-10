import FetchPetition from '..';
import store from '../../redux';
import { POSTSELLS_URL } from '../../utils/urls';
import { Schedule, ScheduleResponse } from './service.types';

export const getScheduleService = async (
  initDate: string,
  endDate: string,
): Promise<Array<Schedule>> => {
  try {
    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;
    const fetching = new FetchPetition(token, true);
    const url = `${POSTSELLS_URL}/GetSchedule?id_propiedad=${houseId}&f_ini=${initDate}&f_fin=${endDate}`;
    const petition = await fetching.get(url);
    const response: ScheduleResponse = await petition.json();
    const data = response.data;
    return data;
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};
