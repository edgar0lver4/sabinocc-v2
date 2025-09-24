import FetchPetition from '..';
import store from '../../redux';
import {PRODUCTS_URL} from '../../utils/urls';
import {
  TProductDetailResponse,
  TProductLeadRequest,
  TProductResponse,
} from './services.types';

export const getProductList = async (): Promise<Array<TProductResponse>> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token);
    const petition: any = await fetching.get(PRODUCTS_URL + '/ListProducts');
    const response: any = await petition.json();
    const data: Array<TProductResponse> = response.data;
    return data;
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
};

export const getProductById = async (
  id: string,
): Promise<TProductDetailResponse | undefined> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token);
    const petition: any = await fetching.get(
      `${PRODUCTS_URL}/Product?id=${id}`,
    );
    const response: any = await petition.json();
    const data: TProductDetailResponse = response.data;
    return data;
  } catch (e) {
    console.log('Error:', e);
    return undefined;
  }
};

export const createLeadProduct = async (
  body: TProductLeadRequest,
): Promise<boolean> => {
  try {
    const token = store.getState().session.token;
    const fetching = new FetchPetition(token);
    const petition: any = await fetching.post(
      `${PRODUCTS_URL}/RegisterLeadProduct`,
      body,
    );
    if (petition.status === 200) {
      return true;
    }
    return false;
  } catch (e) {
    console.log('Error:', e);
    return false;
  }
};
