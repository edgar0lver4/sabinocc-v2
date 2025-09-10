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
import {useCallback, useState} from 'react';
import {
  getIncidentType,
  getIncidentUbication,
} from '../../../services/catalogs/service';
import {useFocusEffect} from '@react-navigation/native';
import Select from '../../../components/select';
import {useFormik} from 'formik';
import {TextInput} from 'react-native-paper';
import {TFormikReport} from '../../../types/report.type';
import {getReportById} from '../../../services/reports/service';
import Loader from '../../../components/loader';
import LabelForm from '../../../components/label';
import {dateISO} from '../../../utils/format';
import Header from '../../../components/header';
import {useAppSelector} from '../../../redux';
import {RoutesName} from '../../../routes/names.enum';

const ReportShowScreen = ({navigation: {navigate}, route: {params}}: any) => {
  const ID_REPORT = params.id;
  const [capturedPhoto, setCapturedPhoto] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const sessionStore = useAppSelector(store => store.session.selectedProperty);
  const subtitle = `Casa ${sessionStore?.name} - ${sessionStore?.proyecto}`;

  const INITAL_STATE = {
    area_vivienda: {label: '', value: ''},
    tipo_reporte: {label: '', value: ''},
    descripcion: '',
    evaluationDate: '',
    nextWorkDate: '',
    adjuntos: null,
  };

  const formik = useFormik({
    initialValues: INITAL_STATE,
    onSubmit: () => {},
  });

  const initApp = async () => {
    setIsLoader(true);
    const incidentsList = await getIncidentType();
    const ubicationsList = await getIncidentUbication();
    const report = await getReportById(ID_REPORT);
    const [inc, ubc] = await Promise.all([incidentsList, ubicationsList]);
    if (inc.length > 0 && ubc.length > 0 && !!report) {
      const strUbic = report.tipoArea;
      const strRepo = report.tipoReporte;
      const findUbc = ubicationsList.find(itm => itm.key === strUbic);
      const findRep = incidentsList.find(itm => itm.key === strRepo);
      const evalDate = !!report.evaluationDate
        ? dateISO(report.evaluationDate)
        : 'Sin fecha de evaluación';
      const repaDate = !!report.nextWorkDate
        ? dateISO(report.nextWorkDate)
        : 'Sin fecha de reparación';
      formik.setFieldValue('evaluationDate', evalDate);
      formik.setFieldValue('nextWorkDate', repaDate);
      formik.setFieldValue('descripcion', report.descripcion);
      if (findUbc)
        formik.setFieldValue('area_vivienda', {
          label: findUbc.key,
          value: findUbc.id,
        });

      if (findRep)
        formik.setFieldValue('tipo_reporte', {
          label: findRep.key,
          value: findRep.id,
        });

      if (report.files?.[0]) setCapturedPhoto(report.files?.[0]?.url);
    } else {
      Alert.alert('Fallo al obtener la información del ticket');
    }
    setIsLoader(false);
  };

  useFocusEffect(
    useCallback(() => {
      initApp();
    }, []),
  );

  return (
    <SafeAreaView style={style.container}>
      {isLoader && <Loader title="Cargando reporte" />}
      <Header
        title={`Reporte ${ID_REPORT}`}
        handleLogout={() => navigate(RoutesName.REPORT_HOME)}
        variant="subscreen"
        subtitle={subtitle}
      />
      <ScrollView style={style.scrollContainer}>
        <Select
          title="Seleccione el tipo de incidente"
          value={formik.values.tipo_reporte.label.toString()}
          style={{marginTop: 16}}
          onActive={() => {}}
        />
        <Select
          title="Seleccione la ubicación"
          value={formik.values.area_vivienda.label.toString()}
          style={{marginTop: 16}}
          onActive={() => {}}
        />
        <TextInput
          label="Descripción de lo sucedido"
          multiline
          numberOfLines={3}
          mode="flat"
          value={formik.values.descripcion}
          theme={{
            colors: {
              onSurfaceVariant: 'white',
              onSurfaceDisabled: 'white',
            },
          }}
          style={{
            marginVertical: 16,
            backgroundColor: BLUE_DARK,
            color: '#fff',
          }}
          textColor="#fff"
          activeUnderlineColor="#fff"
          underlineColor="#fff"
          underlineColorAndroid="#fff"
          onChangeText={formik.handleChange('descripcion')}
          onBlur={formik.handleBlur('descripcion')}
          disabled
        />
        <LabelForm
          title="Fecha de evaluación"
          value={formik.values.evaluationDate}
        />
        <LabelForm
          title="Fecha de reparación"
          value={formik.values.nextWorkDate}
          style={{marginVertical: 16}}
        />
        {capturedPhoto !== '' && (
          <View style={{marginBottom: 16}}>
            <Text style={style.description}>Imagen de referencia</Text>
            <Image
              source={{uri: capturedPhoto}}
              style={{width: 200, height: 200, marginTop: 16}}
              onLoad={() => (
                <View>
                  <Text>Cargando</Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
