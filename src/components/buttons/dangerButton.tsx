import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DANGER_DARK, STEEL_10, STEEL_20} from '../../styles/colors';
import {TButton} from './button.type';

const DangerButton = ({children, disabled, onPress}: TButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={!disabled ? style.formButton : style.formButtonDisabled}>
      <Text style={!disabled ? style.buttonText : style.buttonTextDisabled}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  formButton: {
    width: '100%',
    height: 40,
    backgroundColor: DANGER_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formButtonDisabled: {
    width: '100%',
    height: 40,
    backgroundColor: STEEL_10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonTextDisabled: {
    color: STEEL_20,
    fontWeight: 'bold',
  },
});

export default DangerButton;
