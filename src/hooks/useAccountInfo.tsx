import {useAppSelector} from '../redux';

export const useAccountInfo = () => {
  const sessionStore = useAppSelector(store => store.session);
  const propertyStore = sessionStore.selectedProperty;

  const isVisit = sessionStore.type === 'anonym';
  const isClient = sessionStore.type === 'client';
  const houseInfo = `Casa ${propertyStore?.name} - ${propertyStore?.proyecto}`;
  const textHeader = isClient ? houseInfo : '';

  return {
    headerSub: textHeader,
    isVisit,
    isClient,
  };
};
