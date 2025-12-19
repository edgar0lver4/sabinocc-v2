import { useCallback, useEffect, useState } from 'react';
import { PhotoData } from '../../../../../components/cameraFlux/types';
import { useAppSelector } from '../../../../../redux';
import {
  replyAndCloseTicket,
  replyTicket,
} from '../../../../../services/operator/service';
import { useModalError } from '../../../../../hooks/useModalError';
import { useLoader } from '../../../../../hooks/useLoader';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '../../../../../routes/names.enum';
import { Alert } from 'react-native';
import { getOperatorOptions } from '../../../../../services/catalogs/service';
import { TCatalog } from '../../../../../types/catalogs.type';

export const useTicketOperator = () => {
  const [operatorOptions, setOperatorOptions] = useState<TCatalog[]>([]);
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const { showModalError } = useModalError();
  const { hiddeLoader, showLoader } = useLoader();
  const { navigate } = useNavigation();
  const operatorStore = useAppSelector(store => store.operator);

  const onTakePhoto = (val: PhotoData) => {
    const copy = [...photos];
    copy.push(val);
    setPhotos(copy);
  };

  const handleReplyTicket = async (photos: PhotoData[], comment: string) => {
    const idTicket = operatorStore.selectedTicket?.id || 0;
    showLoader('Respondiendo ticket');
    try {
      const isSend = await replyTicket(idTicket, photos, comment);
      if (isSend) {
        navigate(RoutesName.PROFILE_OPERATOR);
        Alert.alert('Ticket respondido', 'Se respondio el ticket');
      }
    } catch (e) {
      showModalError('Error al responder el ticket intentalo más tarde');
    }
    hiddeLoader();
  };

  const handleReplyAndCloseTicket = async (
    photos: PhotoData[],
    comment: string,
  ) => {
    const idTicket = operatorStore.selectedTicket?.id || 0;
    showLoader('Respondiendo ticket');
    try {
      const isSend = await replyAndCloseTicket(idTicket, photos, comment);
      if (isSend) {
        navigate(RoutesName.PROFILE_OPERATOR);
        Alert.alert('Ticket cerrado', 'Se respondio y cerro el ticket');
      }
    } catch (e) {
      showModalError('Error al responder el ticket intentalo más tarde');
    }
    hiddeLoader();
  };

  const obtainOperatorOptions = async () => {
    const list = await getOperatorOptions();
    if (list.length > 0) {
      setOperatorOptions(list);
    }
  };

  const initializers = useCallback(async () => {
    showLoader('Cargando datos');
    await obtainOperatorOptions();
    hiddeLoader();
  }, []);

  useEffect(() => {
    initializers();
  }, []);

  return {
    photos,
    operatorOptions,
    onTakePhoto,
    handleReplyTicket,
    handleReplyAndCloseTicket,
  };
};
