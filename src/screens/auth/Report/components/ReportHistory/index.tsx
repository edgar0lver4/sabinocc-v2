import { View } from 'react-native';
import { Props } from './type';
import { style } from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Typography from '../../../../../components/typography';
import { YELLOW } from '../../../../../styles/colors';
import { dateISO } from '../../../../../utils/format';

export const ReportHistory = ({ history }: Props) => {
  return (
    <View>
      <View style={style.header}>
        <Typography.DescriptionBold color={YELLOW}>
          <Icon name="user" size={16} /> {history.usr_alta}
        </Typography.DescriptionBold>
        <Typography.DescriptionBold color={YELLOW}>
          <Icon name="calendar" size={16} /> {dateISO(history.fec_alta)}
        </Typography.DescriptionBold>
      </View>
      <View style={style.body}>
        <Typography.Description>{history.dsc}</Typography.Description>
      </View>
    </View>
  );
};
