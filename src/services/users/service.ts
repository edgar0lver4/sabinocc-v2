import FetchPetition from '..';
import store from '../../redux';
import { POSTSELLS_URL, USERS_URL } from '../../utils/urls';

export const loginService = async (body: any, token?: string) => {
  const payload = { ...body, token_disp: token };
  try {
    const fetching = new FetchPetition(undefined, true);
    const petition: any = await fetching.post(
      `${USERS_URL}/ValidateUser`,
      payload,
    );
    if (petition.status === 200) {
      const response = await petition.json();
      return response;
    }
    return false;
  } catch (e) {
    console.log('Error:', e);
    return false;
  }
};

export const registerService = async (body: any) => {
  const OK_STATUS = [200, 201];
  try {
    const fetching = new FetchPetition(undefined, true);
    const petition: any = await fetching.post(
      `${USERS_URL}/RegisterUser`,
      body,
    );
    if (OK_STATUS.includes(petition.status)) {
      const response = await petition.json();
      return { isRegisted: true, error: '', register: response };
    } else {
      const response = await petition.text();
      return { isRegisted: false, error: response, register: null };
    }
  } catch (e) {
    console.log('Error:', e, body);
    return { isRegisted: true, error: e, register: '' };
  }
};

export const deleteAccountService = async (body: any): Promise<boolean> => {
  try {
    const exist = await loginService(body);
    if (exist) {
      const token = await store.getState().session.token;
      const fetching = new FetchPetition(token);
      const petition: any = await fetching.delete(
        `${USERS_URL}/DelUser?id=${body.email}`,
      );
      if (petition.status === 200) {
        return true;
      }
    }
    return false;
  } catch (e) {
    console.log('Error:', e);
    return false;
  }
};
