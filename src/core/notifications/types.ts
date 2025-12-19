import { NotificationRoutes } from './enums';

export type Notification = {
  fec_alta: string;
  msg: string;
  descripcion: string;
  idRoute?: NotificationRoutes;
  id?: string;
};
export type NotificationResponse = {
  data: Notification[];
};
