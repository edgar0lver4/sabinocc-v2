import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { navigate, navigationRef } from './src/routes/rootnavigation';
import { RoutesName } from './src/routes/names.enum';

/*notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { pressAction } = detail;
  if (type === EventType.ACTION_PRESS) {
    const interval = setInterval(() => {
      if (navigationRef.isReady()) {
        clearInterval(interval);
        navigate(RoutesName.CHAT);
      }
    }, 2000);
  }
});*/

messaging().onNotificationOpenedApp(async remoteMessage => {
  const interval = setInterval(() => {
    if (navigationRef.isReady()) {
      clearInterval(interval);
      navigate(RoutesName.CHAT);
    }
  }, 2000);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('setBackgroundMessageHandler:', remoteMessage);
  /*await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      smallIcon: 'ic_launcher_round',
      channelId: ChannelIds.NOTIFICATION,
      pressAction: {
        id: NotificationActions.OPEN_CHAT,
        mainComponent: 'custom-component',
      },
    },
  });*/
});

AppRegistry.registerComponent(appName, () => App);
