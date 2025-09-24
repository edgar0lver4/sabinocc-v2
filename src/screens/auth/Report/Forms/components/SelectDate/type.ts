import { StyleProp, ViewStyle } from 'react-native';
import { Schedule } from '../../../../../../services/schedules/service.types';

export type SelectDateTime = {
  date: string;
  time: string;
};

export type Props = {
  title: string;
  value?: SelectDateTime;
  style?: StyleProp<ViewStyle>;
  listDates?: Array<Schedule>;
  onConfirm: (val: SelectDateTime) => void;
  datesDisabled?: (SelectDateTime | undefined)[];
};
