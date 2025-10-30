import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BLUE_DARK,
  BLUE_LIGHT,
  STEEL_20,
  STEEL_50,
  YELLOW_LIGHT,
} from '../../../styles/colors';
import { useCallback, useState } from 'react';
import {
  getIncidentType,
  getIncidentUbication,
} from '../../../services/catalogs/service';
import { useFocusEffect } from '@react-navigation/native';
import Select from '../../../components/select';
import { useFormik } from 'formik';
import { TextInput } from 'react-native-paper';
import { TFormikReport, TReport } from '../../../types/report.type';
import { getReportById } from '../../../services/reports/service';
import Loader from '../../../components/loader';
import LabelForm from '../../../components/label';
import { dateISO } from '../../../utils/format';
import Header from '../../../components/header';
import { useAppSelector } from '../../../redux';
import { RoutesName } from '../../../routes/names.enum';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { ReportShowSingle } from './views/ReportShowSingle';
import { ReportShowMultiple } from './views/ReportShowMultiple';
import { BottomSheetModalContext } from '@gorhom/bottom-sheet/lib/typescript/contexts';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLoader } from '../../../hooks/useLoader';

const ReportShowScreen = ({
  navigation: { navigate },
  route: { params },
}: any) => {
  const ID_REPORT = params.id;
  const [reports, setReports] = useState<TReport[]>([]);
  const { showSnackbar } = useSnackbar();
  const { hiddeLoader, showLoader } = useLoader();

  const sessionStore = useAppSelector(store => store.session.selectedProperty);
  const subtitle = `Casa ${sessionStore?.name} - ${sessionStore?.proyecto}`;

  const initApp = async () => {
    showLoader('Cargando reportes');
    try {
      const report = await getReportById(ID_REPORT);
      if (report) setReports(report);
    } catch (e) {
      showSnackbar('No se pudo cargar el reporte', 3, 'error');
    }
    hiddeLoader();
  };

  useFocusEffect(
    useCallback(() => {
      initApp();
    }, []),
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={style.container}>
        <Header
          title={`Reporte ${ID_REPORT}`}
          handleLogout={() => navigate(RoutesName.REPORT_HOME)}
          variant="subscreen"
          subtitle={subtitle}
        />
        <ScrollView style={style.scrollContainer}>
          {reports.length === 1 ? (
            <ReportShowSingle report={reports[0]} />
          ) : (
            <ReportShowMultiple reports={reports} />
          )}
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: YELLOW_LIGHT,
    fontSize: 24,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  description: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    padding: 16,
  },
  optionsText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.56,
    color: STEEL_50,
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
});

export default ReportShowScreen;
