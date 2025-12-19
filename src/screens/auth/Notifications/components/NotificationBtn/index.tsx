import { Pressable, TouchableOpacity, View } from 'react-native';
import { Props } from './type';
import { TypographyDescriptionBold } from '../../../../../components/typography/description';
import { dateISO } from '../../../../../utils/format';
import { YELLOW } from '../../../../../styles/colors';
import Typography from '../../../../../components/typography';
import { style } from './style';

import Icon from 'react-native-vector-icons/Feather';

export const NotificationBtn = ({ notification, onPress }: Props) => {
  const handleOnPress = () => {
    onPress();
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={style.container}>
      <View style={style.header}>
        <TypographyDescriptionBold color={YELLOW}>
          <Icon name="bell" color="#fff" size={16} /> {notification.msg}
        </TypographyDescriptionBold>
        <TypographyDescriptionBold color={YELLOW}>
          {dateISO(notification.fec_alta)}
        </TypographyDescriptionBold>
      </View>
      <View style={style.body}>
        <Typography.Description>
          {notification.descripcion}
        </Typography.Description>
      </View>
    </TouchableOpacity>
  );
};
