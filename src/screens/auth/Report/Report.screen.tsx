import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { CalendarList, DateData } from 'react-native-calendars';
import {
  BLUE_DARK,
  BLUE_LIGHT,
  STEEL_20,
  STEEL_50,
  YELLOW_LIGHT,
} from '../../../styles/colors';
import { useState } from 'react';
import Option from '../../../components/option';
import { useFormik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TFormikReport } from '../../../types/report.type';
import { TOptions } from '../../../types/select.type';
import { createReportSerivice } from '../../../services/reports/service';
import Loader from '../../../components/loader';
import Header from '../../../components/header';
import { useAppSelector } from '../../../redux';
import { RoutesName } from '../../../routes/names.enum';
import { useReportForm } from './hooks/useReportFrom';
import ReportForm from './Forms/ReportForm';
import { CameraForm } from './Forms/CameraForm';
import { useReportCamara } from './hooks/useReportCamara';
import { CameraBtn } from './Forms/components/Buttons/CameraBtn';
import { SendBtn } from './Forms/components/Buttons/SendBtn';

const ReportScreen = ({ navigation: { navigate } }: any) => {
  const [options, setOptions] = useState<Array<TOptions>>([]);
  const [selectAct, setSelectAct] = useState<string>('');
  const [isLoader, setIsLoader] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    incidents,
    ubications,
    isOpenSelect,
    optionsRef,
    schedules,
    toggleSelect,
  } = useReportForm();

  const INITAL_STATE: TFormikReport = {
    area_vivienda: { label: '', value: '' },
    tipo_reporte: { label: '', value: '' },
    descripcion: '',
    horario_cliente_1: '',
    horario_cliente_2: '',
    horario_cliente_3: '',
    adjuntos: null,
  };

  const handleCreate = async (e: TFormikReport) => {
    setIsLoader(true);
    const created = await createReportSerivice(e);
    if (!!created) {
      if (created.id !== '') {
        navigate('ReportSended');
      }
    } else {
      Alert.alert('Fallo al enviar el reporte');
    }
    setIsLoader(false);
  };

  const formik = useFormik({
    initialValues: INITAL_STATE,
    onSubmit: handleCreate,
  });

  const {
    showCamera,
    imgBase64,
    setShowCamera,
    confirm,
    checkPermissions,
    retake,
  } = useReportCamara(formik);

  const sessionStore = useAppSelector(store => store.session.selectedProperty);
  const subtitle = `Casa ${sessionStore?.name} - ${sessionStore?.proyecto}`;

  const handleActiveOptions = (val: string) => {
    setSelectAct(val);
    switch (val) {
      case 'inc':
        const list: Array<TOptions> = incidents.map(itm => ({
          label: itm.key,
          value: itm.id,
        }));
        setOptions(list);
        toggleSelect(true);
        break;
      default:
        const listUb: Array<TOptions> = ubications.map(itm => ({
          label: itm.key,
          value: itm.id,
        }));
        setOptions(listUb);
        toggleSelect(true);
        break;
    }
  };

  const handlePress = (val: TOptions) => {
    switch (selectAct) {
      case 'inc':
        formik.setFieldValue('tipo_reporte', val);
        const incfilt = incidents.filter(itm => itm.id === val.value);
        if (incfilt && !incfilt?.[0].isUrgent) {
          setShowCalendar(true);
        } else {
          setShowCalendar(false);
        }
        break;
      default:
        formik.setFieldValue('area_vivienda', val);
        break;
    }
    toggleSelect(false);
  };

  const isOptionSelected = (val: TOptions): boolean => {
    switch (selectAct) {
      case 'inc':
        if (formik.values.tipo_reporte.value === val.value) return true;
      default:
        if (formik.values.area_vivienda.value === val.value) return true;
    }
    return false;
  };

  const isSelectedDates = (): boolean => {
    const val = formik.values;
    const hor1 = val.horario_cliente_1 !== '';
    const hor2 = val.horario_cliente_2 !== '';
    const hor3 = val.horario_cliente_3 !== '';

    if (!showCalendar) return true;
    return hor1 && hor2 && hor3;
  };

  const isCompleteForm = (): boolean => {
    const val = formik.values;
    const adj = val.adjuntos !== null;
    const type = val.area_vivienda.value !== '';
    const area = val.tipo_reporte.value !== '';
    const desc = val.descripcion !== '';

    const selectedDate = isSelectedDates();

    return adj && type && area && desc && selectedDate;
  };

  const handleAction = () => navigate(RoutesName.REPORT_HOME);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={style.container}>
        {isLoader && <Loader />}
        <Header
          title="Reportar garantía"
          subtitle={subtitle}
          handleLogout={handleAction}
          variant="subscreen"
        />
        <ScrollView style={style.scrollContainer}>
          <Text style={style.description}>
            Rellene el siguiente formulario para enviar un ticket
          </Text>
          <ReportForm
            formik={formik}
            handleActiveOptions={handleActiveOptions}
            listDates={schedules}
          />
          {!showCamera && <CameraBtn onPress={checkPermissions} />}
          {imgBase64 !== '' && (
            <View style={{ marginBottom: 16 }}>
              <Text style={style.description}>Imagen de referencia</Text>
              <Image
                source={{ uri: 'data:image/png;base64,' + imgBase64 }}
                style={style.referenceImage}
              />
            </View>
          )}
          <SendBtn
            disabled={!isCompleteForm()}
            onPress={() => formik.handleSubmit()}
          />
        </ScrollView>

        <CameraForm
          showCamera={showCamera}
          setShowCamera={setShowCamera}
          confirm={confirm}
          retake={retake}
        />

        {isOpenSelect && (
          <TouchableOpacity
            onPress={() => toggleSelect(false)}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: BLUE_LIGHT,
              opacity: 0.7,
            }}
          />
        )}

        <BottomSheetModal
          enableDynamicSizing
          ref={optionsRef}
          index={1}
          snapPoints={['25%', '50%']}
        >
          <BottomSheetView style={style.optionsContainer}>
            <Text style={style.optionsText}>Seleccione una opción</Text>
            {options.map((itm, idx) => (
              <Option
                key={'key-' + idx}
                value={itm}
                onPress={() => handlePress(itm)}
                isSelect={isOptionSelected(itm)}
              >
                {itm.label}
              </Option>
            ))}
          </BottomSheetView>
        </BottomSheetModal>
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
  referenceImage: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
});

export default ReportScreen;
