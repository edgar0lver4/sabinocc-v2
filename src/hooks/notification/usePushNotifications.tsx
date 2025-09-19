import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { ChannelIds } from '../../core/notifications/enums';

export function usePushNotifications() {
  const [tokenPhone, setTocketPhone] = useState('');

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken();

    if (token) {
      setTocketPhone(token);
    }

    return enabled;
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  return {
    tokenPhone,
  };
}
