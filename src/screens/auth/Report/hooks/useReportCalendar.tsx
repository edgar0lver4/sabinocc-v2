import { FormikProps } from 'formik';
import { TFormikReport } from '../../../../types/report.type';
import { useState } from 'react';
import { DateData } from 'react-native-calendars';
import { BLUE_DARK } from '../../../../styles/colors';
import { SelectDateTime } from '../Forms/components/SelectDate/type';

export const useReportCalendar = (formik: FormikProps<TFormikReport>) => {
  const [daysMarket, setDaysMarket] = useState<any>({});
  const [dateT1, setDateT1] = useState<SelectDateTime>();
  const [dateT2, setDateT2] = useState<SelectDateTime>();
  const [dateT3, setDateT3] = useState<SelectDateTime>();

  const handleSetValue = (val: SelectDateTime, fieldName: string) => {
    const split = val.time.split('-');
    const time = split[0];
    const dateTime = `${val.date}T${time}`;
    assignDate(fieldName, val);
    formik.setFieldValue(fieldName, dateTime);
  };

  const assignDate = (field: string, val: SelectDateTime) => {
    switch (field) {
      case 'horario_cliente_1':
        setDateT1(val);
        break;
      case 'horario_cliente_2':
        setDateT2(val);
        break;
      case 'horario_cliente_3':
        setDateT3(val);
        break;
    }
  };

  return {
    daysMarket,
    dateT1,
    dateT2,
    dateT3,
    handleSetValue,
  };
};
