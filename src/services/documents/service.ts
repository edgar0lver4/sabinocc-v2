import FetchPetition from '..';
import store from '../../redux';
import {TDocuments} from '../../types/documents.type';
import {DOCUMENT_URL} from '../../utils/urls';

export const getHouseInformationList = async () => {
  try {
    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;
    const fetching = new FetchPetition(token, true);
    const petition: any = await fetching.get(
      `${DOCUMENT_URL}/Property?id_propiedad=${houseId}`,
    );
    const response: TDocumentResponse = await petition.json();
    const data: Array<TDocuments> = response.data;
    return data;
  } catch (e) {
    console.log('Error en documents/property:', e);
    return [];
  }
};

export const getExpedientList = async () => {
  try {
    const token = store.getState().session.token;
    const house = store.getState().session.selectedProperty;
    const houseId = house?.id || 0;
    const fetching = new FetchPetition(token, true);
    const petition: any = await fetching.get(
      `${DOCUMENT_URL}/expedient?id_propiedad=${houseId}`,
    );
    const response: TDocumentResponse = await petition.json();
    const data: Array<TDocuments> = response.data;
    return data;
  } catch (e) {
    console.log('Error en documents/expedient:', e);
    return [];
  }
};
