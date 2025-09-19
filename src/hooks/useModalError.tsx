import { useAppDispatch } from '../redux';
import { showErrorModalRdx } from '../redux/slicer/errors.slicer';

export const useModalError = () => {
  const dispatch = useAppDispatch();
  const showModalError = (title: string, status?: number) => {
    dispatch(showErrorModalRdx({ isOpen: true, status: status || 0, title }));
  };

  return {
    showModalError,
  };
};
