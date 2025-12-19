import { useCallback, useEffect, useState } from 'react';
import storage from '../../db/storage';
import { EStorage } from '../../enums/storage.enum';
import { getConfigurations } from '../../services/config/service';
import store, { useAppDispatch } from '../../redux';
import { setSessionInfoRdx } from '../../redux/slicer/session.slicer';
import { jwtDecode } from 'jwt-decode';
import { useSplashScreen } from '../useSplashScreen';
export const useIniitalConfiguration = () => {
  const [numErros, setNumErrors] = useState(0);
  const [numSuccess, setNumSuccess] = useState(0);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  const { showSplash, hiddeSplash } = useSplashScreen();

  const getConfig = async () => {
    try {
      const config = await storage.load({
        key: EStorage.settings,
        autoSync: true,
        syncInBackground: true,
      });
      if (!config.data) {
        const config = await getConfigurations();
        storage.save({
          key: EStorage.settings,
          data: config,
        });
        setNumSuccess(prev => prev + 1);
      }
    } catch (e) {
      setNumErrors(prev => prev + 1);
    }
  };

  const initAppData = useCallback(async () => {
    try {
      const load = await storage.load({
        key: EStorage.login,
        autoSync: true,
        syncInBackground: true,
      });
      if (load) {
        store.dispatch(setSessionInfoRdx(load));
        const decode = jwtDecode(load.token);
        const expired = new Date(decode.exp || '').getTime();
        const dataNow = Math.floor(new Date().getTime() / 1000);
        const rest = expired - dataNow;
        setShowExpiredModal(rest <= 0);
        setNumSuccess(prev => prev + 1);
      }
    } catch (e) {
      const error: any = e;
      console.log('Error:', error);
      setNumErrors(prev => prev + 1);
    }
  }, []);

  const initialize = useCallback(async () => {
    showSplash();
    Promise.all([initAppData, getConfig]);
    hiddeSplash();
  }, [initAppData]);

  return {
    initialize,
    showExpiredModal,
  };
};
