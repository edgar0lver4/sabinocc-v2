import { ReportRequest } from '../../../../../../../services/reports/types';
import { TCatalog } from '../../../../../../../types/catalogs.type';

export type Props = {
  report: ReportRequest;
  ubications: TCatalog[];
  incdents: TCatalog[];
  onPress: () => void;
};
