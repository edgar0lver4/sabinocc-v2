import store, { useAppDispatch } from '../redux';
import { hiddeSc, showSc } from '../redux/slicer/splash.slicer';

export const useSplashScreen = () => {
  const showSplash = (message?: string, showLoader?: boolean) => {
    store.dispatch(
      showSc({
        message: message || '',
        show: true,
        showLoader: showLoader || false,
      }),
    );
  };

  const hiddeSplash = () => {
    store.dispatch(hiddeSc());
  };

  return {
    showSplash,
    hiddeSplash,
  };
};
