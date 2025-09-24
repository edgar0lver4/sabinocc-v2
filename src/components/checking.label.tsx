import {View, Text, StyleSheet} from 'react-native';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {GREEN, GREEN_LIGHT} from '../styles/colors';

type Props = {
  label: string;
  isChecked: boolean;
};

const CheckingLabel = ({label, isChecked}: Props) => {
  return (
    <View style={styles.container}>
      <IconOcticons
        name={isChecked ? 'dot-fill' : 'dot'}
        size={32}
        color={isChecked ? GREEN : '#fff'}
      />
      <Text style={isChecked ? styles.labelChecked : styles.label}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  labelChecked: {
    fontSize: 16,
    color: GREEN_LIGHT,
    marginLeft: 8,
  },
});

export default CheckingLabel;
