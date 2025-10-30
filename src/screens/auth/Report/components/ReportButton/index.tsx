import { Props } from './variants/ToSend/type';
import { memo } from 'react';
import ReportButtonToSend from './variants/ToSend/ToSend';
import ReportButtonPreview from './variants/Preview/Preview';

const ReportButton = {
  ToSend: ReportButtonToSend,
  Preview: ReportButtonPreview,
};

export default ReportButton;
