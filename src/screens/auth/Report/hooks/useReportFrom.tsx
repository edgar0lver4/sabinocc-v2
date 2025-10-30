import { useCallback, useRef, useState } from 'react';
import {
  getIncidentType,
  getIncidentUbication,
} from '../../../../services/catalogs/service';
import { TCatalog } from '../../../../types/catalogs.type';
import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LocaleConfig } from 'react-native-calendars';
import { Schedule } from '../../../../services/schedules/service.types';
import { getScheduleService } from '../../../../services/schedules/service';
import dayjs from 'dayjs';
import { useLoader } from '../../../../hooks/useLoader';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

export const useReportForm = () => {
  const TODAY = dayjs().format('YYYY-MM-DD');
  const { showLoader, hiddeLoader } = useLoader();

  const [ubications, setUbications] = useState<Array<TCatalog>>([]);
  const [incidents, setIncidents] = useState<Array<TCatalog>>([]);
  const [schedules, setSchedules] = useState<Array<Schedule>>([]);
  const [isOpenSelect, setIsOpenSelect] = useState<Boolean>(false);
  const [dateSelected, setDateSelected] = useState(TODAY);

  const optionsRef = useRef<BottomSheetModal>(null);

  const toggleSelect = (val: boolean) => {
    if (val) optionsRef.current?.present();
    else optionsRef.current?.close();
    setIsOpenSelect(val);
  };

  const initData = async () => {
    showLoader('Cargando catalogos');
    const dateToFind = dayjs(dateSelected);
    const initDate = dateToFind.startOf('month').format('YYYY-MM-DD');
    const endDate = dateToFind.endOf('month').format('YYYY-MM-DD');

    const incidentsList = await getIncidentType();
    const ubicationsList = await getIncidentUbication();
    const scheduleList = await getScheduleService(initDate, endDate);
    const [inc, ubc, shd] = await Promise.all([
      incidentsList,
      ubicationsList,
      scheduleList,
    ]);
    if (inc.length > 0 && ubc.length > 0 && shd.length > 0) {
      setUbications(ubc);
      setIncidents(inc);
      setSchedules(shd);
    }
    hiddeLoader();
  };

  useFocusEffect(
    useCallback(() => {
      initData();
    }, []),
  );

  return {
    ubications,
    incidents,
    isOpenSelect,
    optionsRef,
    schedules,
    toggleSelect,
    setDateSelected,
  };
};
