import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TButton} from './button.type';
import {BLUE_DARK, BLUE_DARK_TRANSPARENT} from '../../styles/colors';

const FloatButton = ({children, disabled, onPress}: TButton) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.floatButton}>
      <Text style={style.floatButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  floatButton: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    left: 20,
    elevation: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BLUE_DARK_TRANSPARENT,
  },
  floatButtonText: {
    color: BLUE_DARK,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

export default FloatButton;
