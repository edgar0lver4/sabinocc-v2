import { string } from 'yup';

export type TButton = {
  disabled?: boolean;
  icon?: React.ReactNode;
  children: string | string[];
  onPress: () => void;
};

export type TButtonIcon = {
  disabled?: boolean;
  name?: string;
  colorIcon: string;
  iconSize?: number;
  onPress: () => void;
};
