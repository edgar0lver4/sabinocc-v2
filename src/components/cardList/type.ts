import { GestureResponderEvent } from 'react-native';
import { Property } from '../../types/properties.type';

export type Props = {
  title?: string;
  subtitle?: string;
  onPress: (item: GestureResponderEvent) => void;
};
