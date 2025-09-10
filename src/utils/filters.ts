import {TActivity} from '../services/activities/services.type';
import {transformDate} from './format';

const filterUp = (a: TActivity, b: TActivity) => {
  const dateA: any = new Date(`${transformDate(a.date)}T${a.hour}:00Z`);
  const dateB: any = new Date(`${transformDate(b.date)}T${b.hour}:00Z`);
  return dateB - dateA;
};

const filterDown = (a: TActivity, b: TActivity) => {
  const dateA: any = new Date(`${transformDate(a.date)}T${a.hour}:00Z`);
  const dateB: any = new Date(`${transformDate(b.date)}T${b.hour}:00Z`);
  return dateA - dateB;
};

export const FilterActivity = {
  UP: filterUp,
  DOWN: filterDown,
};
