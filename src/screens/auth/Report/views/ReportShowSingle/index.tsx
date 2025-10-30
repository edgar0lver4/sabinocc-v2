import { TextInput } from 'react-native-paper';
import Select from '../../../../../components/select';
import LabelForm from '../../../../../components/label';
import { Image, Text, View } from 'react-native';
import { Props } from './type';
import { BLUE_DARK, STEEL_WHITE } from '../../../../../styles/colors';
import { useMemo } from 'react';
import Typography from '../../../../../components/typography';
import { dateISO } from '../../../../../utils/format';

export const ReportShowSingle = ({ report }: Props) => {
  const capturedPhoto: string = useMemo(() => {
    if (report.files?.[0]) {
      return report.files[0].url;
    }
    return '';
  }, [report]);

  const dateEvaluation: string = useMemo(() => {
    if (!!report.evaluationDate) {
      return dateISO(report.evaluationDate);
    }
    return 'Sin fecha de evaluación';
  }, [report]);

  const dateWorkDate: string = useMemo(() => {
    if (!!report.nextWorkDate) {
      return dateISO(report.nextWorkDate);
    }
    return 'Sin fecha de reparación';
  }, [report]);

  return (
    <>
      <Select
        title="Seleccione el tipo de incidente"
        value={report.tipoReporte}
        style={{ marginTop: 16 }}
        onActive={() => {}}
      />
      <Select
        title="Seleccione la ubicación"
        value={report.tipoArea}
        style={{ marginTop: 16 }}
        onActive={() => {}}
      />
      <TextInput
        label="Descripción de lo sucedido"
        multiline
        numberOfLines={3}
        mode="flat"
        value={report.descripcion}
        theme={{
          colors: {
            onSurfaceVariant: 'white',
            onSurfaceDisabled: 'white',
          },
        }}
        style={{
          marginVertical: 16,
          backgroundColor: BLUE_DARK,
          color: '#fff',
        }}
        textColor="#fff"
        activeUnderlineColor="#fff"
        underlineColor="#fff"
        underlineColorAndroid="#fff"
        disabled
      />
      <LabelForm title="Fecha de evaluación" value={dateEvaluation} />
      <LabelForm
        title="Fecha de reparación"
        value={dateWorkDate}
        style={{ marginVertical: 16 }}
      />
      {capturedPhoto !== '' && (
        <View style={{ marginBottom: 16 }}>
          <Typography.DescriptionBold color={STEEL_WHITE}>
            Imagen de referencia
          </Typography.DescriptionBold>
          <Image
            source={{ uri: capturedPhoto }}
            style={{ width: 200, height: 200, marginTop: 16 }}
            onLoad={() => (
              <View>
                <Text>Cargando</Text>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
};
