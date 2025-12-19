import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_WHITE } from '../../../../../styles/colors';

export const style = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BLUE_DARK,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  body: {
    paddingHorizontal: 4,
    paddingVertical: 16,
    backgroundColor: STEEL_WHITE,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
});
