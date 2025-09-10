import { useAppDispatch } from '../redux';
import { closeLoader, showLoaderRdx } from '../redux/slicer/loader.slicer';

export const useLoader = () => {
  const dispatch = useAppDispatch();
  const showLoader = (title: string) => {
    dispatch(showLoaderRdx({ isOpen: true, title }));
  };
  const hiddeLoader = () => {
    dispatch(closeLoader());
  };

  return {
    showLoader,
    hiddeLoader,
  };
};
