import { Pressable, StyleSheet } from 'react-native';
import { TButtonIcon } from './button.type';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GREEN } from '../../styles/colors';

export const IconButton = ({
  onPress,
  disabled,
  name,
  colorIcon,
  iconSize,
}: TButtonIcon) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={style.btnContainer}>
      <Icon name={name} size={iconSize || 24} color={colorIcon} />
    </Pressable>
  );
};

const style = StyleSheet.create({
  btnContainer: {
    padding: 8,
    backgroundColor: GREEN,
    borderRadius: 10,
  },
});
