import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/lucide';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {BLUE_DARK} from '../styles/colors';

type Props = {
  iconName: string;
  title: string;
  onPress: () => void;
};

const MenuButtonLucide = ({iconName, title, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.leftView}>
        <Icon name={iconName} size={32} color="#fff" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <IconFA
        style={{marginRight: 8}}
        name="angle-right"
        size={32}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BLUE_DARK,
    padding: 8,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  leftView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default MenuButtonLucide;
