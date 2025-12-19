import { StyleSheet } from 'react-native';
import { BLUE_LIGHT } from '../../styles/colors';

export const style = StyleSheet.create({
  loader: {
    display: 'flex',
    flexDirection: 'row',
  },
  spinner: {
    marginLeft: 16,
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: BLUE_LIGHT,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
