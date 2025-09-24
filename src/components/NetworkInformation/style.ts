import { StyleSheet } from 'react-native';
import { DANGER_DARK, DANGER_LIGHT } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    zIndex: 10000,
    padding: 8,
    backgroundColor: DANGER_LIGHT,
    position: 'absolute',
    width: '100%',
    paddingTop: 32,
    alignItems: 'center',
  },
  text: {
    color: DANGER_DARK,
    lineHeight: 22.34,
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 16,
  },
});
