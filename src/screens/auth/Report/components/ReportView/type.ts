import {
  ReportRequest,
  ReportResponse,
} from '../../../../../services/reports/types';
import { TCatalog } from '../../../../../types/catalogs.type';

export type Props = {
  reports: ReportRequest[];
  incdents: TCatalog[];
  ubications: TCatalog[];
};
