import { StyleSheet } from 'react-native';
import { STEEL_WHITE } from '../../../../../../../styles/colors';

export const style = StyleSheet.create({
  contianer: {
    backgroundColor: STEEL_WHITE,
    padding: 4,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
