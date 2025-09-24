import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SendBtnProps } from './type';
import { styles } from './styles';

export const SendBtn = ({ disabled, onPress }: SendBtnProps) => {
  const containerStyle = disabled
    ? styles.sndReportSubmitDisable
    : styles.sndReportSubmit;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={containerStyle}
      onPress={onPress}
    >
      <Icon name="file-document" size={24} color={'#fff'} style={styles.mr8} />
      <Text style={styles.description}>Enviar Reporte</Text>
    </TouchableOpacity>
  );
};
