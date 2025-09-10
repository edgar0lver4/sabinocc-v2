import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {BLUE, BLUE_DARK, BLUE_LIGHT, YELLOW_LIGHT} from '../../styles/colors';
import storage from '../../db/storage';
import {useAppDispatch, useAppSelector} from '../../redux';
import {closeSession} from '../../redux/slicer/session.slicer';
import globalStyle from '../../styles/globals';
import {useState} from 'react';
import Loader from '../../components/loader';
import MenuApp from '../../components/menu';
import {EStorage} from '../../enums/storage.enum';
import Typography from '../../components/typography';
import DeviceInfo from 'react-native-device-info';
import {useAccountInfo} from '../../hooks/useAccountInfo';

const ProfileScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {headerSub, isClient} = useAccountInfo();
  const dispatch = useAppDispatch();
  const sessionStore = useAppSelector(itm => itm.session);

  const handleLogout = async () => {
    setIsLoading(true);
    dispatch(closeSession());
    await storage.remove({key: EStorage.login});
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BLUE_LIGHT}}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <View style={style.headerContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/logo_dorado.webp')}
            style={{width: 56, height: 56}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
            Bienvenido
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out" color="#fff" size={32} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={style.profileContainer}>
          <View style={{paddingLeft: 16}}>
            <Text style={{...globalStyle.typography_h1, color: YELLOW_LIGHT}}>
              {sessionStore.name}
            </Text>
            {isClient && (
              <Text
                style={{...globalStyle.typography_body_regular, color: '#fff'}}>
                {sessionStore.email}
              </Text>
            )}
            {isClient && (
              <Text
                style={{...globalStyle.typography_body_regular, color: '#fff'}}>
                {headerSub}
              </Text>
            )}
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: BLUE_LIGHT, padding: 16}}>
          <MenuApp navigation={navigation} type={sessionStore.type} />
        </View>
        <View style={style.footer}>
          <Typography.BodySmall>
            Versión {DeviceInfo.getVersion()}
          </Typography.BodySmall>
        </View>
        {isLoading && <Loader />}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    paddingBottom: 16,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: BLUE_DARK,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80, // Ancho de la imagen
    height: 80, // Alto de la imagen
    borderRadius: 75, // Radio de borde para hacer la imagen redonda
    borderWidth: 3, // Ancho del borde (opcional)
    borderColor: '#fff', // Color del borde (opcional)
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: BLUE_LIGHT,
    padding: 16,
    alignItems: 'center',
    maxHeight: 108,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default ProfileScreen;
