import { Text, TextInput } from 'react-native-paper';
import Select from '../../../../components/select';
import { FormReport } from './types';
import { styles } from './style';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useReportCalendar } from '../hooks/useReportCalendar';
import { SelectDate } from './components/SelectDate';
import { useMemo } from 'react';

const ReportForm = ({
  formik,
  listDates,
  reports,
  handleActiveOptions,
}: FormReport) => {
  const { daysMarket, dateT1, dateT2, dateT3, handleSetValue } =
    useReportCalendar(formik);
  const themeInput: ThemeProp = {
    colors: {
      onSurfaceVariant: 'white',
    },
  };

  const listDisabled = [dateT1, dateT2, dateT3];

  const isDisabledDate = useMemo(() => {
    if (reports.length >= 1) return true;
    return false;
  }, [reports]);

  return (
    <>
      <Select
        title="Seleccione el tipo de reporte"
        value={formik.values.tipo_reporte.label.toString()}
        style={{ marginTop: 16 }}
        onActive={() => handleActiveOptions('inc')}
      />
      <Select
        title="Seleccione la ubicación"
        value={formik.values.area_vivienda.label.toString()}
        style={{ marginTop: 16 }}
        onActive={() => handleActiveOptions('ubc')}
      />
      <TextInput
        label="Cuentanos más de lo sucedido"
        multiline
        numberOfLines={3}
        mode="flat"
        theme={themeInput}
        style={styles.textInput}
        textColor="#fff"
        activeUnderlineColor="#fff"
        underlineColor="#fff"
        underlineColorAndroid="#fff"
        value={formik.values.descripcion}
        onChangeText={formik.handleChange('descripcion')}
        onBlur={formik.handleBlur('descripcion')}
      />
      <SelectDate
        title="Seleccione una fecha de revisión"
        onConfirm={val => handleSetValue(val, 'horario_cliente_1')}
        value={dateT1}
        style={{ marginBottom: 16 }}
        listDates={listDates}
        datesDisabled={listDisabled}
        disabled={isDisabledDate}
      />
    </>
  );
};

export default ReportForm;
