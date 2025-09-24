import {StyleSheet, Text} from 'react-native';
import {TTypography} from './typography.type';

const Paragraph = ({children}: TTypography) => {
  return <Text style={style.text}>{children}</Text>;
};

const style = StyleSheet.create({
  text: {
    fontWeight: '600',
    textAlign: 'justify',
    color: '#fff',
    letterSpacing: 0.5,
    marginTop: 16,
    fontSize: 16,
  },
});

export default Paragraph;
