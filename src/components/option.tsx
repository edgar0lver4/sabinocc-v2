import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BLUE_DARK } from '../styles/colors';

type Props = {
  children: string | number;
  value: any;
  isSelect: boolean;
  onPress: (val: string | number | boolean) => void;
};

const Option = ({ children, value, isSelect, onPress }: Props) => {
  const handlePress = () => {
    onPress(value);
  };

  if (isSelect)
    return (
      <TouchableOpacity style={style.containerSelect} onPress={handlePress}>
        <Icon name="check" color={'#fff'} style={{ marginLeft: 8 }} />
        <Text style={style.textSelect}>{children}</Text>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity style={style.container} onPress={handlePress}>
      <Text style={style.textNormal}>{children}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginVertical: 4,
  },
  containerSelect: {
    paddingVertical: 8,
    marginVertical: 4,
    backgroundColor: BLUE_DARK,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSelect: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 18,
    letterSpacing: 0.5,
    lineHeight: 19.2,
  },
  textNormal: {
    color: BLUE_DARK,
    marginLeft: 8,
    fontSize: 18,
    letterSpacing: 0.5,
    lineHeight: 19.2,
  },
});

export default Option;
