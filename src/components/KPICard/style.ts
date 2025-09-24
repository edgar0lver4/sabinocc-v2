import { StyleSheet } from 'react-native';
import {
  BLUE_DARK,
  DANGER,
  GREEN,
  STEEL_80,
  STEEL_WHITE,
  YELLOW_LIGHT,
} from '../../styles/colors';

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 100,
    backgroundColor: STEEL_WHITE,
    borderColor: BLUE_DARK,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    padding: 8,
  },
  containerActive: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 100,
    backgroundColor: YELLOW_LIGHT,
    borderColor: STEEL_WHITE,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 22.14,
    letterSpacing: 0.5,
    color: BLUE_DARK,
  },
  number: {
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: 1,
    color: STEEL_80,
  },
  numberDanger: {
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: 1,
    color: DANGER,
  },
  numberSuccess: {
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: 1,
    color: GREEN,
  },
});
