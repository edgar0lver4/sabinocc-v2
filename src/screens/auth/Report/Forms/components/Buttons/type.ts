import { StyleProp, ViewStyle } from 'react-native';

export type CameraBtnProps = {
  onPress: () => Promise<void> | void;
  style?: StyleProp<ViewStyle>;
};

export type SendBtnProps = {
  disabled: boolean;
  onPress: () => void;
};

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  onPress: () => Promise<void> | void;
  style?: StyleProp<ViewStyle>;
  iconName?: string;
  variant?: 'DEFAUTL' | 'DANGER' | 'SUCCESS' | 'WARNING';
};
