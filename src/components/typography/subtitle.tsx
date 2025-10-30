import { StyleSheet, Text } from 'react-native';
import { TTypography } from './typography.type';
import { YELLOW_LIGHT } from '../../styles/colors';

const Subtitle = ({ children, color = YELLOW_LIGHT }: TTypography) => {
  return <Text style={[style.text, { color: color }]}>{children}</Text>;
};

const style = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default Subtitle;
