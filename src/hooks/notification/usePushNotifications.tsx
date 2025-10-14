import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import {
  ChannelIds,
  ChannelNames,
  NotificationActions,
} from '../../core/notifications/enums';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '../../routes/names.enum';

export function usePushNotifications() {
  const [tokenPhone, setTocketPhone] = useState('');
  const { navigate } = useNavigation();

  async function requestUserPermission() {
    await notifee.requestPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken();
    await notifee.createChannel({
      id: ChannelIds.NOTIFICATION,
      name: ChannelNames.NOTIFICATION,
    });

    if (token) {
      setTocketPhone(token);
    }

    return enabled;
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          //console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          if (detail.pressAction) {
            const idAction = detail.pressAction.id;
            if (idAction === NotificationActions.OPEN_CHAT) {
              navigate(RoutesName.CHAT as never);
            }
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const notification = remoteMessage.notification;
      await notifee.displayNotification({
        title: notification?.title,
        body: notification?.body,
        android: {
          channelId: ChannelIds.NOTIFICATION,
          smallIcon: 'ic_launcher_round',
          pressAction: {
            id: NotificationActions.OPEN_CHAT,
            mainComponent: 'custom-component',
          },
        },
      });
    });

    return unsubscribe;
  }, []);

  return {
    tokenPhone,
  };
}
