import { useCallback, useEffect, useState } from 'react';
import { Notification } from '../../core/notifications/types';
import { getNotifications } from '../../services/notifications/service';
import { useSnackbar } from '../useSnackbar';
import { useLoader } from '../useLoader';
import { NotificationRoutes } from '../../core/notifications/enums';
import { MapperRouteNotification } from '../../core/notifications/mappers';
import { useNavigation } from '@react-navigation/native';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { showSnackbar } = useSnackbar();
  const { showLoader, hiddeLoader } = useLoader();
  const { navigate } = useNavigation();

  const withNotifications = notifications.length > 0;

  const getToRoute = (idRoute: NotificationRoutes, id: string) => {
    const realRoute = MapperRouteNotification[idRoute];
    navigate(realRoute, { id: id });
  };

  const initData = useCallback(async () => {
    showLoader('Cargando notificaciones');
    try {
      const notifications = await getNotifications();
      setNotifications(notifications);
    } catch (e) {
      showSnackbar('Error al cargar las notificaciones', 3, 'error');
    }
    hiddeLoader();
  }, []);

  useEffect(() => {
    initData();
  }, []);

  return {
    notifications,
    withNotifications,
    getToRoute,
  };
};
