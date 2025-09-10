export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};
export type Props = {
  title: string;
  titleModal: string;
  options: Option[];
  value?: string;
  diasabled?: boolean;
  onPress?: (val: string | number | boolean) => void;
};
