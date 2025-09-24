import { FormikProps, useFormik } from 'formik';
import { TFormikReport } from '../../../../types/report.type';
import { Dispatch } from '@reduxjs/toolkit';
import { SetStateAction } from 'react';
import { Schedule } from '../../../../services/schedules/service.types';

export type FormReport = {
  formik: FormikProps<TFormikReport>;
  handleActiveOptions: (val: string) => void;
  listDates: Array<Schedule>;
};

export type FromCamera = {
  showCamera: boolean;
  setShowCamera: Dispatch<SetStateAction<any>>;
  confirm: (uri: string) => Promise<void>;
  retake: () => void;
};
