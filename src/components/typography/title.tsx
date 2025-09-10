import {StyleSheet, Text} from 'react-native';
import {TTypography} from './typography.type';
import {YELLOW_LIGHT} from '../../styles/colors';

const Title = ({children}: TTypography) => {
  return <Text style={style.text}>{children}</Text>;
};

const style = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: YELLOW_LIGHT,
    fontSize: 24,
    letterSpacing: 1,
  },
});

export default Title;
