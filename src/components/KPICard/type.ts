export type Props = {
  number: number;
  title: string;
  isActive?: boolean;
  variant?: 'DEFAULT' | 'DANGER' | 'SUCCESS';
  onPress?: () => Promise<void> | void;
};
