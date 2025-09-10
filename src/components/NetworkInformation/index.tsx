import { Text, View } from 'react-native';
import { styles } from './style';
import { Lucide } from '@react-native-vector-icons/lucide';
import { DANGER_DARK } from '../../styles/colors';
import { useNetInfoInstance } from '@react-native-community/netinfo';

export const NewtworkInformation = () => {
  const {
    netInfo: { isConnected, isInternetReachable },
  } = useNetInfoInstance();
  if (isConnected && isInternetReachable) return;

  return (
    <View style={styles.container}>
      <Lucide
        name="wifi-off"
        size={32}
        style={styles.icon}
        color={DANGER_DARK}
      />
      <Text style={styles.text}>No tienes conexion a internet</Text>
    </View>
  );
};
