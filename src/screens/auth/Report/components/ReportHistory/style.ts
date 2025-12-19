import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_WHITE } from '../../../../../styles/colors';

export const style = StyleSheet.create({
  header: {
    backgroundColor: BLUE_DARK,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  body: {
    backgroundColor: STEEL_WHITE,
    padding: 16,
    height: 'auto',
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
});
