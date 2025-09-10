import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_WHITE } from '../../../../../../styles/colors';

export const style = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 360,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10000,
  },
  titleModal: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BLUE_DARK,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconModal: {
    marginRight: 16,
  },
  textTitle: {
    color: STEEL_WHITE,
    lineHeight: 12.3,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.8,
  },
  buttonsContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  mb8: {
    marginBottom: 8,
  },
  descriptionContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  textDescription: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22.33,
    letterSpacing: 0.4,
  },
});
