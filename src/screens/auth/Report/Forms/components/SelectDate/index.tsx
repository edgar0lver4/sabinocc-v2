import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './style';
import { Props, SelectDateTime } from './type';
import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Calendar, DateData } from 'react-native-calendars';
import { BLUE_DARK } from '../../../../../../styles/colors';
import Day from './components/day';
import dayjs from 'dayjs';
import { BottomSheetChanges, DISPONIBILITY } from './enums';
import { ModalSelect } from '../ModalSelect';
import { Option } from '../ModalSelect/types';
import Button from '../../../../../../components/buttons';

export const SelectDate = ({
  title,
  style,
  listDates,
  value,
  datesDisabled,
  onConfirm,
}: Props) => {
  const DATE_SELECT = value?.date || '';
  const HOUR_SELECT = value?.time || '';
  const [dayTempSelect, setDayTemp] = useState({});
  const [dateStrTemp, setDateStrTemp] = useState(DATE_SELECT);
  const [listHours, setListHours] = useState<Option[]>([]);
  const [hourSelected, setHourSelected] = useState(HOUR_SELECT);

  const listDateDisabled = useMemo(() => {
    return datesDisabled?.map(itm => itm?.date) || [];
  }, [datesDisabled]);

  console.log('listDateDisabled:', listDateDisabled);

  const optionsRef = useRef<BottomSheetModal>(null);
  const TODAY = dayjs().format('YYYY-MM-DD');

  const listSchedules = useMemo(() => {
    const dates: string[] = [];
    listDates?.map(itm => {
      if (!dates.includes(itm.fecha_especifica)) {
        dates.push(itm.fecha_especifica);
      }
    });
    return dates;
  }, [listDates]);

  const dayComponent = (date: DateData) => {
    const isToday = date.dateString === TODAY;
    const isSelected = date.dateString === dateStrTemp;

    const isInDateList = listDateDisabled?.includes(date.dateString);
    const isNotDisponibility = !listSchedules.includes(date.dateString);
    const isBefore = dayjs(date.dateString).isBefore(TODAY);

    const disable = isNotDisponibility || isInDateList || isBefore;
    return (
      <Day
        date={date}
        isToday={isToday}
        isSelected={isSelected}
        disabled={disable}
        onPress={() => handleSelectDay(date)}
      />
    );
  };

  const handleSelectDay = (date: DateData) => {
    const obj = {
      [date.dateString]: {
        selected: true,
        selectedColor: BLUE_DARK,
      },
    };
    if (listDates) {
      const filter = listDates.filter(
        itm =>
          itm.fecha_especifica === date.dateString &&
          itm.tipo_disponibilidad === DISPONIBILITY.DISPONIBLY,
      );
      if (filter?.length > 0) {
        const mapper: Option[] = filter.map(itm => ({
          label: `${itm.hora_inicio}-${itm.hora_fin}`,
          value: `${itm.hora_inicio}-${itm.hora_fin}`,
        }));
        setListHours(mapper);
      }
    }
    setDayTemp(obj);
    setDateStrTemp(date.dateString);
    setHourSelected('');
  };

  const openBottom = () => {
    optionsRef.current?.present();
  };

  const handleCancel = () => {
    optionsRef.current?.close();
    setDayTemp({});
    setDateStrTemp('');
    setHourSelected('');
    setListHours([]);
  };

  const handleChange = (val: BottomSheetChanges) => {
    if (val === BottomSheetChanges.CLOSE) {
      setDayTemp({});
      setDateStrTemp('');
      setHourSelected('');
    } else {
      setDateStrTemp(DATE_SELECT);
      setHourSelected(HOUR_SELECT);
    }
  };

  const handleSave = () => {
    const obj: SelectDateTime = {
      date: dateStrTemp,
      time: hourSelected,
    };
    onConfirm(obj);
    optionsRef.current?.close();
  };

  const DISABLE_SELECT = dateStrTemp === '';
  const DISABLE_SAVE = dateStrTemp === '' || hourSelected === '';

  const VALUE_STR = useMemo(() => {
    if (value) {
      const split = value?.time.split('-');
      const time = split[0];
      const dateTime = `${value?.date}T${time}`;
      return dayjs(dateTime).format('YYYY-MM-DD HH:mm A');
    }
    return '';
  }, [value]);

  return (
    <>
      <TouchableOpacity style={[styles.container, style]} onPress={openBottom}>
        <Text style={VALUE_STR !== '' ? styles.titleActive : styles.title}>
          {title}
        </Text>
        {value && <Text style={styles.title}>{VALUE_STR}</Text>}
      </TouchableOpacity>
      <BottomSheetModal
        enableDynamicSizing
        ref={optionsRef}
        index={1}
        snapPoints={['75%', '85%']}
        onChange={handleChange}
      >
        <BottomSheetView style={styles.containerBottom}>
          <Text style={styles.text}>Seleccione una fecha y hora</Text>
          <Calendar
            minDate={new Date().toString()}
            theme={{
              textSectionTitleColor: BLUE_DARK,
              arrowColor: BLUE_DARK,
              selectedDayTextColor: '#fff',
            }}
            onDayPress={handleSelectDay}
            markedDates={dayTempSelect}
            dayComponent={date => dayComponent(date.date as DateData)}
          />
          <ModalSelect
            title="Seleccione una hora"
            titleModal="Seleccione un horario de atención"
            options={listHours}
            diasabled={DISABLE_SELECT}
            value={hourSelected}
            onPress={val => setHourSelected(val as string)}
          />
          <View style={styles.buttonsContainer}>
            <Button.Primary onPress={handleSave} disabled={DISABLE_SAVE}>
              Guardar fecha
            </Button.Primary>
            <Button.PrimaryOutline onPress={handleCancel}>
              Cancelar
            </Button.PrimaryOutline>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
