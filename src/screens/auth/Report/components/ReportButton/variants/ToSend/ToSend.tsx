import { TouchableOpacity, View } from 'react-native';
import Typography from '../../../../../../../components/typography';
import { style } from './style';
import { Props } from './type';

const ReportButtonToSend = ({
  incdents,
  report,
  ubications,
  onPress,
}: Props) => {
  const { id_tipo_reporte, id_area_vivienda, descripcion } = report;
  const area = ubications.find(itm => itm.id === id_area_vivienda);
  const tipo = incdents.find(itm => itm.id === id_tipo_reporte);
  return (
    <TouchableOpacity style={style.contianer} onPress={() => onPress()}>
      <View style={style.header}>
        <Typography.Description>Donde:{area?.key || ''}</Typography.Description>
        <Typography.Description>Tipo:{tipo?.key || ''}</Typography.Description>
      </View>
      <View>
        <Typography.DescriptionBold>{descripcion}</Typography.DescriptionBold>
      </View>
    </TouchableOpacity>
  );
};

export default ReportButtonToSend;
