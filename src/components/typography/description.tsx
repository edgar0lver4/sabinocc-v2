import { StyleSheet, Text } from 'react-native';
import { TTypography } from './typography.type';
import { BLUE_DARK } from '../../styles/colors';

export const TypographyDescriptionBold = ({
  children,
  color = BLUE_DARK,
}: TTypography) => {
  return (
    <Text style={[style.descriptionBold, { color: color }]}>{children}</Text>
  );
};

export const TypographyDescription = ({
  children,
  color = BLUE_DARK,
}: TTypography) => {
  return <Text style={[style.description, { color: color }]}>{children}</Text>;
};

const style = StyleSheet.create({
  descriptionBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.15,
  },
});
