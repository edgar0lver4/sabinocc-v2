import { Text, TouchableOpacity } from 'react-native';
import { Props } from './type';
import { style } from './style';
import { memo } from 'react';

const Day = ({ date, isToday, isSelected, disabled, onPress }: Props) => {
  const styleTextDisabled = disabled ? style.textDisabled : style.textDay;
  const styleTextToday = isToday ? style.textToday : styleTextDisabled;
  const styleText = isSelected ? style.textSelected : styleTextToday;
  const styleContainer = isSelected ? style.containerSelected : style.container;
  return (
    <TouchableOpacity
      style={styleContainer}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styleText}>{date.day}</Text>
    </TouchableOpacity>
  );
};

export default memo(Day);
