import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type Props = {
  children: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  variant?: 'DEFAULT' | 'SCROLL';
};
