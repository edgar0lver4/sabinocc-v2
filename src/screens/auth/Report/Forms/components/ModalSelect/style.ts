import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_20 } from '../../../../../../styles/colors';

export const style = StyleSheet.create({
  container: {
    borderColor: BLUE_DARK,
    borderWidth: 2,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  containerSelected: {
    borderColor: BLUE_DARK,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  containerDisabled: {
    borderColor: STEEL_20,
    borderWidth: 2,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  title: {
    color: BLUE_DARK,
    fontWeight: '500',
    fontSize: 18,
  },
  titleDisabled: {
    color: STEEL_20,
    fontWeight: '500',
    fontSize: 18,
  },
  titleActive: {
    color: BLUE_DARK,
    fontWeight: '500',
    fontSize: 10,
  },
  containerOptions: {
    backgroundColor: '#fff',
    margin: 16,
    flexDirection: 'column',
    borderRadius: 8,
    padding: 16,
    maxHeight: 300,
  },
});
