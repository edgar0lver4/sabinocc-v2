import { Text, TouchableOpacity, View } from 'react-native';
import { Props } from './type';
import { style } from './style';

const KPICard = ({
  number,
  title,
  variant = 'DEFAULT',
  isActive,
  onPress,
}: Props) => {
  const isDanger = variant === 'DANGER';
  const isSuccess = variant === 'SUCCESS';

  const styleSuccess = isSuccess ? style.numberSuccess : style.number;
  const styleVariant = isDanger ? style.numberDanger : styleSuccess;
  const styleContainer = isActive ? style.containerActive : style.container;

  const handelOnPress = async () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity style={styleContainer} onPress={handelOnPress}>
      <Text style={style.title}>{title}</Text>
      <Text style={styleVariant}>{number}</Text>
    </TouchableOpacity>
  );
};

export default KPICard;
