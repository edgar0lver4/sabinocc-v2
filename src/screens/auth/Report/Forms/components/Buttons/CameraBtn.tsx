import { TouchableOpacity } from 'react-native';
import { CameraBtnProps } from './type';
import { Text } from 'react-native-paper';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BLUE_DARK } from '../../../../../../styles/colors';

export const CameraBtn = ({ onPress, style }: CameraBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnCamera, style]}>
      <Icon name="camera-plus" size={24} color={BLUE_DARK} />
      <Text style={styles.textCamera}>Tomar una foto</Text>
    </TouchableOpacity>
  );
};
