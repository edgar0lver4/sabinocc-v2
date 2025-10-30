import { Text, View } from 'react-native';
import { Props } from './type';
import { style } from './style';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ReportButton from '../ReportButton';
import { useMemo, useRef, useState } from 'react';
import { ReportRequest } from '../../../../../services/reports/types';
import dayjs from 'dayjs';
import { ReportVisualizer } from '../ReportVisualizer';

export const ReportView = ({ incdents, reports, ubications }: Props) => {
  const [reportSelected, setReportSelected] = useState<ReportRequest>();
  const bottomRef = useRef<BottomSheetModal>(null);

  const ubication = useMemo(() => {
    const finded = ubications.find(
      itm => itm.id === reportSelected?.id_area_vivienda,
    );
    if (finded?.key) {
      return finded.key;
    }
    return '';
  }, [reportSelected]);

  const type = useMemo(() => {
    const finded = incdents.find(
      itm => itm.id === reportSelected?.id_tipo_reporte,
    );
    if (finded?.key) {
      return finded.key;
    }
    return '';
  }, [reportSelected]);

  const dateProgrammer = useMemo(() => {
    const date = dayjs(reportSelected?.horario_cliente_1).format(
      'YYYY-MM-DD HH:mm A',
    );
    return date;
  }, [reportSelected]);

  const openDetails = (val: ReportRequest) => {
    setReportSelected(val);
    bottomRef.current?.present();
  };

  if (reports.length === 0) {
    return;
  }

  return (
    <View>
      <Text style={style.description}>Reportes asociados</Text>
      {reports.map((itm, idx) => (
        <ReportButton.ToSend
          key={`key-${idx}`}
          incdents={incdents}
          ubications={ubications}
          report={itm}
          onPress={() => openDetails(itm)}
        />
      ))}
      <ReportVisualizer
        ref={bottomRef}
        date={dateProgrammer}
        description={reportSelected?.descripcion || ''}
        image={reportSelected?.adjuntos?.[0]?.fileContent}
        type={type}
        ubication={ubication}
        isBase64
      />
    </View>
  );
};
