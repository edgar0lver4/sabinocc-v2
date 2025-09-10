import FetchPetition from '..';
import {CONFIG_URL} from '../../utils/urls';
import {ConfigResponse} from './service.type';

export const getConfigurations = async (): Promise<ConfigResponse> => {
  try {
    const fetching = new FetchPetition(undefined, true);
    const petition: any = await fetching.get(`${CONFIG_URL}/GetConfig`);
    const response: ConfigResponse = await petition.json();
    return response;
  } catch (e) {
    console.log('Error en documents/expedient:', e);
    return [];
  }
};
