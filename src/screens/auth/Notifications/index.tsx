import Header from '../../../components/header';
import { ScreenContainer } from '../../../components/container';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '../../../hooks/notification/useNotifications';
import { FlatList } from 'react-native';
import { NotificationBtn } from './components/NotificationBtn';
import { Notification } from '../../../core/notifications/types';

export const NotificationListScreen = () => {
  const { goBack } = useNavigation();
  const { notifications, getToRoute } = useNotifications();
  const handlePress = (item: Notification) => {
    if (item.idRoute && item.id) getToRoute(item.idRoute, item.id);
  };
  return (
    <ScreenContainer>
      <Header
        title="Notificaciones"
        subtitle="Listado de notificaciones"
        handleLogout={goBack}
        variant="subscreen"
      />
      <FlatList
        data={notifications}
        renderItem={({ item, index }) => (
          <NotificationBtn
            key={index}
            notification={item}
            onPress={() => handlePress(item)}
          />
        )}
      />
    </ScreenContainer>
  );
};
