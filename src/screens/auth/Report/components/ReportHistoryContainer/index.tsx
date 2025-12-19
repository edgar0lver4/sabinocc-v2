import { ReportHistory } from '../ReportHistory';
import { Props } from './type';
import { View } from 'react-native';
import { style } from './style';
import Typography from '../../../../../components/typography';
import { YELLOW } from '../../../../../styles/colors';

export const ReportHistoryContainer = ({ history }: Props) => {
  if (history.length === 0)
    return (
      <Typography.DescriptionBold color={YELLOW}>
        No hay historial
      </Typography.DescriptionBold>
    );

  return (
    <>
      <View style={style.header}>
        <Typography.DescriptionBold color={YELLOW}>
          Historial de cambios
        </Typography.DescriptionBold>
      </View>
      {history.map((itm, i) => (
        <ReportHistory key={i} history={itm} />
      ))}
    </>
  );
};
