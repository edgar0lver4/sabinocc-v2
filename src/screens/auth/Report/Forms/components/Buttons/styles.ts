import { StyleSheet } from 'react-native';
import {
  BLUE_DARK,
  DANGER,
  DANGER_DARK,
  GREEN,
  STEEL_20,
  YELLOW,
} from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  btnCamera: {
    padding: 8,
    backgroundColor: '#fff',
    marginVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCamera: {
    color: BLUE_DARK,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  sndReportSubmit: {
    backgroundColor: BLUE_DARK,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 8,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 32,
  },
  sndReportSubmitDisable: {
    backgroundColor: STEEL_20,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 8,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 32,
  },
  description: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mr8: {
    marginRight: 8,
  },
  btnSuccess: {
    padding: 12,
    backgroundColor: GREEN,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnDefault: {
    padding: 12,
    backgroundColor: BLUE_DARK,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnWarning: {
    padding: 12,
    backgroundColor: YELLOW,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnDanger: {
    padding: 12,
    backgroundColor: DANGER_DARK,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnDisabled: {
    padding: 12,
    backgroundColor: STEEL_20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
