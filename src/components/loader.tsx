import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {BLUE_DARK, BLUE_LIGHT} from '../styles/colors';

type Props = {
  title?: string;
};

const Loader = ({title}: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={BLUE_LIGHT} />
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  text: {
    color: BLUE_DARK,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Loader;
