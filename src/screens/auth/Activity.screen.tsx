import IconFather from 'react-native-vector-icons/Feather';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BLUE,
  BLUE_DARK,
  BLUE_LIGHT,
  GREEN,
  GREEN_DARK,
  GREEN_LIGHT,
} from '../../styles/colors';
import {useCallback, useEffect, useState} from 'react';
import {
  getActivityById,
  subscribeActivityById,
} from '../../services/activities/services';
import {TActivity} from '../../services/activities/services.type';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/loader';
import {transformDate} from '../../utils/format';
import Typography from '../../components/typography';
import Button from '../../components/buttons';
import {Alert} from 'react-native';

const ActivityScreen = ({navigation: {navigate}, route: {params}}: any) => {
  const [activity, setActivity] = useState<TActivity>();

  const isFinalized = () => {
    if (activity?.date && activity.hour) {
      const dateA: any = new Date(
        `${transformDate(activity?.date)}T${activity?.hour}:00Z`,
      );
      const dateB: any = new Date();
      return dateA - dateB <= 0;
    }
    return false;
  };

  const getBackgroundColors = () => {
    if (activity?.isRegister) {
      if (!isFinalized() && activity.isRegister) {
        return BLUE;
      } else if (isFinalized()) {
        return GREEN;
      }
    }
    return BLUE_DARK;
  };

  const getColors = () => {
    if (activity?.isRegister) {
      if (!isFinalized() && activity.isRegister) {
        return BLUE_DARK;
      } else if (isFinalized()) {
        return GREEN_DARK;
      }
    }
    return BLUE_DARK;
  };

  const handleSubscribe = async () => {
    const id = params.id;
    const register = await subscribeActivityById(id);
    if (register) {
      const data = await getActivityById(id);
      if (data) {
        setActivity(data);
      }
    } else {
      Alert.alert('Error al registrar en la actividad');
    }
  };

  const init = useCallback(() => {
    const init = async () => {
      const id = params.id;
      const data = await getActivityById(id);
      if (data) {
        setActivity(data);
      }
    };
    init();
  }, []);

  useEffect(() => {
    init();
  }, []);

  if (!activity)
    return (
      <View style={styles.container}>
        <Loader title="Cargando actividad" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      {!isFinalized() && activity.isRegister && (
        <View style={styles.statusCardRegister}>
          <IconFather name="user-check" size={32} color={getColors()} />
          <Text style={styles.textCardRegister}>Registrado</Text>
        </View>
      )}
      {isFinalized() && (
        <View style={styles.statusCard}>
          <IconFather name="check-circle" size={32} color={getColors()} />
          <Text style={styles.textCard}>Finalizado</Text>
        </View>
      )}
      <ImageBackground
        source={{uri: activity.image}}
        style={styles.imageActivity}
      />
      <View style={{padding: 16}}>
        <Typography.Title>{activity.title}</Typography.Title>
        <Typography.BodySmall>
          Cuando: {activity.date}-{activity.hour}
        </Typography.BodySmall>
        <Typography.Pharagraph>{activity.description}</Typography.Pharagraph>
      </View>
      {!isFinalized() && !activity.isRegister && (
        <Button.FloatButton onPress={handleSubscribe}>
          Inscribirme
        </Button.FloatButton>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
  },
  imageActivity: {
    width: '100%',
    height: 240,
  },
  statusCard: {
    width: '100%',
    padding: 16,
    backgroundColor: GREEN_LIGHT,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  statusCardRegister: {
    width: '100%',
    padding: 16,
    backgroundColor: BLUE,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  textCard: {
    color: GREEN_DARK,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.17,
    marginLeft: 24,
  },
  textCardRegister: {
    color: BLUE_DARK,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.17,
    marginLeft: 24,
  },
});

export default ActivityScreen;
