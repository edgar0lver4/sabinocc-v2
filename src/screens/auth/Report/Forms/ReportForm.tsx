import { Text, TextInput } from 'react-native-paper';
import Select from '../../../../components/select';
import { FormReport } from './types';
import { styles } from './style';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useReportCalendar } from '../hooks/useReportCalendar';
import { SelectDate } from './components/SelectDate';

const ReportForm = ({ formik, listDates, handleActiveOptions }: FormReport) => {
  const { daysMarket, dateT1, dateT2, dateT3, handleSetValue } =
    useReportCalendar(formik);
  const themeInput: ThemeProp = {
    colors: {
      onSurfaceVariant: 'white',
    },
  };

  const listDisabled = [dateT1, dateT2, dateT3];

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
        onChangeText={formik.handleChange('descripcion')}
        onBlur={formik.handleBlur('descripcion')}
      />
      {1 - Object.keys(daysMarket).length !== 0 ? (
        <Text style={styles.description}>
          Seleccione {1 - Object.keys(daysMarket).length} fechas para la
          revisión
        </Text>
      ) : (
        <Text style={styles.description}>
          Fechas seleccionadas de forma exitosa
        </Text>
      )}
      <SelectDate
        title="Seleccione una fecha"
        onConfirm={val => handleSetValue(val, 'horario_cliente_1')}
        value={dateT1}
        style={{ marginTop: 16, marginBottom: 16 }}
        listDates={listDates}
        datesDisabled={listDisabled}
      />
    </>
  );
};

export default ReportForm;
