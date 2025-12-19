import { RoutesName } from '../../routes/names.enum';
import { NotificationRoutes } from './enums';

export const MapperRouteNotification = {
  [NotificationRoutes.ACTIVIDAD]: RoutesName.ACTIVITY,
  [NotificationRoutes.CHAT]: RoutesName.CHAT,
  [NotificationRoutes.DESARROLLO]: RoutesName.LIST_PROYECTS,
  [NotificationRoutes.EXP]: RoutesName.MY_EXPEDIENT,
  [NotificationRoutes.HOME]: RoutesName.LIST_PROPERTIES,
  [NotificationRoutes.INFO]: RoutesName.HOUSE_INFORMATION,
  [NotificationRoutes.MENSAJE]: RoutesName.CHAT,
  [NotificationRoutes.REPORTES]: RoutesName.REPORT_SHOW,
  [NotificationRoutes.TYC]: RoutesName.TYC,
};
