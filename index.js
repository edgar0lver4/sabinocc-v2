import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('recibiendo:', remoteMessage);
  await notifee.displayNotification({
    title: `Desde notifee: ${remoteMessage.notification?.title}`,
    body: remoteMessage.notification?.body,
    subtitle: 'Esto es un subtitle',
    android: {
      smallIcon: 'ic_launcher_round',
      channelId: 'notifi-channel',
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
