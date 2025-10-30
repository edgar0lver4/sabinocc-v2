import { useMemo, useRef, useState } from 'react';
import Typography from '../../../../../components/typography';
import { STEEL_WHITE } from '../../../../../styles/colors';
import ReportButton from '../../components/ReportButton';
import { Props } from './type';
import { ReportRequest } from '../../../../../services/reports/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ReportVisualizer } from '../../components/ReportVisualizer';
import dayjs from 'dayjs';
import { TReport } from '../../../../../types/report.type';

export const ReportShowMultiple = ({ reports }: Props) => {
  const [reportSelected, setReportSelected] = useState<TReport>();
  const bottomRef = useRef<BottomSheetModal>(null);

  const openDetails = (val: TReport) => {
    setReportSelected(val);
    bottomRef.current?.present();
  };

  const dateProgrammer = useMemo(() => {
    const date = dayjs(reportSelected?.evaluationDate).format(
      'YYYY-MM-DD HH:mm A',
    );
    return date;
  }, [reportSelected]);
  return (
    <>
      <Typography.DescriptionBold color={STEEL_WHITE}>
        Reportes asociados
      </Typography.DescriptionBold>
      {reports.map(itm => (
        <ReportButton.Preview
          key={itm.numTicket}
          onPress={() => openDetails(itm)}
          report={itm}
        />
      ))}
      <ReportVisualizer
        ref={bottomRef}
        date={dateProgrammer}
        description={reportSelected?.descripcion || ''}
        image={reportSelected?.files?.[0]?.url}
        type={reportSelected?.tipoReporte || ''}
        ubication={reportSelected?.tipoArea || ''}
      />
    </>
  );
};
