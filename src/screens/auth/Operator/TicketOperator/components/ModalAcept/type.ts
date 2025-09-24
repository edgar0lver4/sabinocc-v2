export type Props = {
  visible: boolean;
  onCancel: () => void;
  onAccept: () => Promise<void> | void;
};
