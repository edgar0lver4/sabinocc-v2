import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { ButtonProps } from './type';

export const AppButton = ({
  label,
  disabled,
  style,
  iconName,
  variant = 'DEFAUTL',
  onPress,
}: ButtonProps) => {
  const isSuccess = variant === 'SUCCESS';
  const isWarning = variant === 'WARNING';
  const isDanger = variant === 'DANGER';

  const variantSuccess = isSuccess ? styles.btnSuccess : styles.btnDefault;
  const variantWarning = isWarning ? styles.btnWarning : variantSuccess;
  const variantDanger = isDanger ? styles.btnDanger : variantWarning;
  const variantDisabled = disabled ? styles.btnDisabled : variantDanger;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[variantDisabled, style]}
      onPress={onPress}
    >
      {iconName && (
        <Icon name={iconName} size={24} color={'#fff'} style={styles.mr8} />
      )}
      <Text style={styles.description}>{label}</Text>
    </TouchableOpacity>
  );
};
