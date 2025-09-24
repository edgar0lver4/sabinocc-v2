import { StyleSheet } from 'react-native';
import { BLUE_DARK, YELLOW_LIGHT } from '../../styles/colors';

export const style = StyleSheet.create({
  headerContainer: {
    paddingBottom: 16,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: BLUE_DARK,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    elevation: 5,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: { flexDirection: 'row', justifyContent: 'center' },
  imageSubscreenContainer: {
    flexDirection: 'row',
  },
  titleSubscreen: {
    letterSpacing: 0.5,
    fontWeight: '600',
    color: YELLOW_LIGHT,
    fontSize: 20,
  },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  topBtn: {
    marginTop: 16,
    marginBottom: 8,
  },
});
