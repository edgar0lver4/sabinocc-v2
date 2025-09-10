import { StyleSheet } from 'react-native';
import { BLUE_LIGHT } from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  courtine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: BLUE_LIGHT,
    opacity: 0.9,
  },
  viewerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageConfirm: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  p8: {
    padding: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
});
