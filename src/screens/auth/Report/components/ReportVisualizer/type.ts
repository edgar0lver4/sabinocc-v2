import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

export type Props = {
  ref: RefObject<BottomSheetModal | null>;
  image: string;
  isBase64?: boolean;
  ubication: string;
  type: string;
  date: string;
  description: string;
};
