import { DateData } from 'react-native-calendars';

export type Props = {
  date: DateData;
  isToday: boolean;
  isSelected: boolean;
  disabled: boolean;
  onPress: () => void;
};
