import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_20 } from '../../../../../../../../styles/colors';

export const style = StyleSheet.create({
  container: {
    padding: 8,
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSelected: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: BLUE_DARK,
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDay: {
    lineHeight: 22.16,
    fontSize: 16,
    fontWeight: '600',
    color: BLUE_DARK,
  },
  textTodayDisabled: {
    lineHeight: 22.16,
    fontSize: 16,
    color: STEEL_20,
    fontWeight: '600',
  },
  textToday: {
    lineHeight: 22.16,
    fontSize: 16,
    color: BLUE_DARK,
    fontWeight: '600',
  },
  textDisabled: {
    lineHeight: 22.16,
    fontSize: 16,
    color: STEEL_20,
  },
  textSelected: {
    lineHeight: 22.16,
    fontSize: 16,
    color: '#fff',
  },
});
