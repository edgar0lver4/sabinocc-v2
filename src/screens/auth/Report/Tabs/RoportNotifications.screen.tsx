import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TNotification} from '../../../../types/report.type';
import {BLUE_LIGHT, STEEL_50} from '../../../../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  notifications: Array<TNotification>;
  onPress?: (val: string) => void;
};

const ReportNotificationsScreen = ({notifications, onPress}: Props) => {
  const handlePress = (val: any) => {
    onPress && onPress(val);
  };

  const getStyle = () => {
    if (notifications.length === 0) return style.container;
    return style.containerProducts;
  };

  return (
    <ScrollView style={getStyle()}>
      {notifications.length === 0 && (
        <Text style={style.textWithNotProducts}>
          No hay notificaciones que mostrar
        </Text>
      )}
      {notifications.length > 0 &&
        notifications.map((itm, idx) => (
          <TouchableOpacity
            onPress={() => handlePress(itm.idWarranty)}
            key={'id-' + idx}
            style={style.notiContainer}>
            <Icon name="notifications" size={36} color={BLUE_LIGHT} />
            <View style={style.textContainer}>
              <Text style={style.title}>{itm.title}</Text>
              <Text style={style.description}>{itm.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '75%',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  containerProducts: {
    flex: 1,
    height: '75%',
    paddingVertical: 8,
  },
  textWithNotProducts: {
    paddingTop: 16,
    color: BLUE_LIGHT,
    fontWeight: 'bold',
    fontSize: 18,
  },
  notiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 6,
    marginVertical: 8,
    padding: 8,
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22.57,
    color: '#0F0F0F',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: STEEL_50,
  },
});

export default ReportNotificationsScreen;
