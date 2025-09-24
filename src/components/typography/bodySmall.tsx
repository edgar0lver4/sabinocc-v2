import {StyleSheet, Text} from 'react-native';
import {TTypography} from './typography.type';

const BodySmall = ({children}: TTypography) => {
  return <Text style={style.text}>{children}</Text>;
};

const style = StyleSheet.create({
  text: {
    fontWeight: '600',
    textAlign: 'justify',
    color: '#DEDEDE',
    letterSpacing: 0.5,
    marginTop: 8,
    fontSize: 14,
  },
});

export default BodySmall;
