import {StyleSheet} from 'react-native';
import {BLUE_DARK, BLUE_DARK_TRANSPARENT} from '../../styles/colors';

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 8,
    borderColor: BLUE_DARK,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: BLUE_DARK_TRANSPARENT,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
  },
  outSelectLine: {
    width: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  textTitle: {
    color: '#fff',
    letterSpacing: 0.5,
    fontSize: 18,
  },
  textSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
});
