import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {BLUE_DARK} from '../styles/colors';

type Props = {
  title: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
};

const LabelForm = ({title, value = '', style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={value !== '' ? styles.titleActive : styles.title}>
        {title}
      </Text>
      {value && <Text style={styles.title}>{value}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE_DARK,
    padding: 16,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  titleActive: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 10,
  },
});

export default LabelForm;
