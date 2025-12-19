import { TCatalog } from '../../types/catalogs.type';

export type SelectorProps = {
  options: TCatalog[];
  title: string;
  onSelect: (val: TCatalog) => void;
};
