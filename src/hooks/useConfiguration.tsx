import {useEffect, useState} from 'react';
import {ConfigResponse} from '../services/config/service.type';
import storage from '../db/storage';
import {EStorage} from '../enums/storage.enum';

export const useConfiguration = () => {
  const [config, setConfig] = useState<ConfigResponse>([]);
  const initialize = async () => {
    const config: ConfigResponse = await storage.load({
      key: EStorage.settings,
      autoSync: true,
      syncInBackground: true,
    });
    if (config) {
      setConfig(config);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const TYC = config.find(itm => itm.key === 'MKS-TYC');
  const INSTA = config.find(itm => itm.key === 'MKS-RSI');
  const FACE = config.find(itm => itm.key === 'MKS-RSF');
  const LINKDIN = config.find(itm => itm.key === 'MKS-RSL');
  const YOUTUBE = config.find(itm => itm.key === 'MKS-RSY');
  const PHONE = config.find(itm => itm.key === 'MKS-MCT');
  const MAIL = config.find(itm => itm.key === 'MKS-MCM');
  const TDEL = config.find(itm => itm.key === 'MKS-DEL');

  return {
    tyc: TYC,
    insta: INSTA,
    face: FACE,
    linkdin: LINKDIN,
    ytb: YOUTUBE,
    phone: PHONE,
    mail: MAIL,
    tdel: TDEL,
  };
};
