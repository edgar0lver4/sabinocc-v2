import { useAppDispatch } from '../redux';
import { showErrorModalRdx } from '../redux/slicer/errors.slicer';

export const useModalError = () => {
  const dispatch = useAppDispatch();
  const showModalError = (title: string) => {
    dispatch(showErrorModalRdx({ isOpen: true, status: 400, title }));
  };

  return {
    showModalError,
  };
};
