export type TButton = {
  disabled?: boolean;
  icon?: React.ReactNode;
  children: string | string[];
  onPress: () => void;
};
