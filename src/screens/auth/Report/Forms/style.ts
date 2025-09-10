import { StyleSheet } from 'react-native';
import { BLUE_DARK } from '../../../../styles/colors';

export const styles = StyleSheet.create({
  textInput: {
    marginVertical: 16,
    backgroundColor: BLUE_DARK,
    color: '#fff',
  },
  description: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 16,
  },
  cameraBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 16,
    backgroundColor: '#000',
    opacity: 0.7,
  },
  camera: {
    flex: 1,
  },
});
