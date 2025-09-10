import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { BLUE_DARK } from '../styles/colors';
import { useState } from 'react';

type Props = {
  title: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
  onActive: () => void;
};

const Select = ({ title, value = '', style, onActive }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
    onActive();
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={toggleActive}>
      <Text style={value !== '' ? styles.titleActive : styles.title}>
        {title}
      </Text>
      {value && <Text style={styles.title}>{value}</Text>}
    </TouchableOpacity>
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

export default Select;
