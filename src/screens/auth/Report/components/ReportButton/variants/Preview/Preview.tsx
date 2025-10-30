import { TouchableOpacity, View } from 'react-native';
import Typography from '../../../../../../../components/typography';
import { style } from './style';
import { Props } from './type';

const ReportButtonPreview = ({ report, onPress }: Props) => {
  return (
    <TouchableOpacity style={style.contianer} onPress={() => onPress()}>
      <View style={style.header}>
        <Typography.Description>Donde:{report.tipoArea}</Typography.Description>
        <Typography.Description>
          Tipo:{report.tipoReporte}
        </Typography.Description>
      </View>
      <View>
        <Typography.DescriptionBold>
          {report.descripcion}
        </Typography.DescriptionBold>
      </View>
    </TouchableOpacity>
  );
};

export default ReportButtonPreview;
