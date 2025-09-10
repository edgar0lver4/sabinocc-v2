import { StyleSheet } from 'react-native';
import { BLUE_DARK, STEEL_BLACK } from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE_DARK,
    padding: 16,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  titleActive: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 10,
  },
  containerBottom: {
    backgroundColor: '#fff',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22.56,
    color: STEEL_BLACK,
    marginHorizontal: 16,
  },
  buttonsContainer: {
    marginHorizontal: 16,
  },
});
