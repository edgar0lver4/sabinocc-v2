export type Props = {
  isVisible: boolean;
  header: string;
  title: string;
  description: string;
  btnPrimaryLabel: string;
  btnSecondaryLabel: string;
  btnPrimaryDisabled?: boolean;
  btnSecondaryDisabled?: boolean;
  onPressAccept: () => void | Promise<void>;
  onPressCancel: () => void | Promise<void>;
};
