import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_10, STEEL_WHITE } from '../../../../styles/colors';

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  datesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  titleDate: {
    fontWeight: 600,
    color: STEEL_WHITE,
    lineHeight: 12.5,
  },
  textDate: {
    fontWeight: 400,
    color: STEEL_10,
    lineHeight: 12.5,
  },
  photoViews: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  comments: {
    backgroundColor: BLUE_DARK,
    color: '#fff',
  },
  btnsContainer: {
    paddingHorizontal: 16,
  },
  mb16: {
    marginBottom: 16,
  },
});
