import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_WHITE } from '../../styles/colors';

export const style = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 360,
    alignSelf: 'center',
  },
  modalContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalHeader: {
    backgroundColor: BLUE_DARK,
    paddingVertical: 12,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  modalHeaderText: {
    color: STEEL_WHITE,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: BLUE_DARK,
    textAlign: 'center',
    marginVertical: 12,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    color: BLUE_DARK,
    marginBottom: 16,
  },
  btn: {
    marginBottom: 12,
  },
});
