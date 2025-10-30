import { useAppDispatch } from '../redux';
import { showSnack } from '../redux/slicer/snackbar.slicer';

export const useSnackbar = () => {
  const dispatch = useAppDispatch();
  const showSnackbar = (
    message: string,
    duration: number,
    variant: 'success' | 'error',
  ) => {
    dispatch(showSnack({ duration, message, variant }));
  };

  return {
    showSnackbar,
  };
};
