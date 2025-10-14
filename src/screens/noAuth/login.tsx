import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import IconMaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/loader';
import { loginService } from '../../services/users/service';
import { useFormik } from 'formik';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import storage from '../../db/storage';
import { useAppDispatch } from '../../redux';
import { setSessionInfoRdx } from '../../redux/slicer/session.slicer';
import Button from '../../components/buttons';
import Typography from '../../components/typography';
import DeviceInfo from 'react-native-device-info';
import { BLUE_DARK, BLUE_LIGHT } from '../../styles/colors';
import { EStorage } from '../../enums/storage.enum';
import { Property } from '../../types/properties.type';
import { TSession } from '../../types/session.types';
import AnimatedLottieView from 'lottie-react-native';
import ANIMATION from '../../animations/loading_dots.json';
import { getConfigurations } from '../../services/config/service';
import { useModalError } from '../../hooks/useModalError';
import { UserType } from '../../core/users/enum';
import { usePushNotifications } from '../../hooks/notification/usePushNotifications';

const LoginScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showFade, setShowFade] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { showModalError } = useModalError();
  const { tokenPhone } = usePushNotifications();

  const dispatch = useAppDispatch();
  // URL de la imagen de fondo
  const imageUrl =
    'https://static.wixstatic.com/media/a4d916_c725834759bb41d28c59b2d2c2f87d15f000.jpg/v1/fill/w_1785,h_700,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/a4d916_c725834759bb41d28c59b2d2c2f87d15f000.jpg';

  const INITAL_VALUES = {
    email: '',
    password: '',
  };

  const handleGoto = () => {
    setIsLoading(true);
    navigation.navigate('Register');
  };

  const handleSubmit = async (e: typeof INITAL_VALUES) => {
    setIsLoading(true);
    Keyboard.dismiss();
    const response = await loginService(e, tokenPhone);
    if (response) {
      const properties: Property[] = response.propiedades;
      const body = {
        type: response.type,
        token: response.token,
        name: response.name,
        email: response.email,
        properties,
      };
      dispatch(setSessionInfoRdx(body));
      storage.save({
        key: EStorage.login,
        data: body,
      });
    } else {
      showModalError('Usario o contraseña invalido');
    }
    setIsLoading(false);
  };

  const handleAnonym = () => {
    const body: TSession = {
      type: UserType.ANONIM,
      token: '',
      name: 'Visitante',
      email: '',
      properties: [],
    };
    dispatch(setSessionInfoRdx(body));
    storage.save({
      key: EStorage.login,
      data: body,
    });
  };

  const formik = useFormik({
    initialValues: INITAL_VALUES,
    onSubmit: handleSubmit,
  });

  const getConfig = async () => {
    try {
      const config = storage.load({
        key: EStorage.settings,
        autoSync: true,
        syncInBackground: true,
      });
      if (!config.data) {
        setShowFade(true);
        const config = await getConfigurations();
        storage.save({
          key: EStorage.settings,
          data: config,
        });
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }).start();
        setShowFade(false);
      }
    } catch (e) {
      showModalError('Error al obtener la configuración');
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
      getConfig();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showFade && (
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: BLUE_LIGHT,
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: fadeAnim,
          }}
        >
          <Image
            source={require('../../assets/logo_dorado.webp')}
            style={{ width: 120, height: 120, marginBottom: 16 }}
          />
          <Typography.Pharagraph>
            SABINO | Creando comunidades
          </Typography.Pharagraph>
          <AnimatedLottieView
            autoPlay
            source={ANIMATION}
            style={{ marginTop: 120, flex: 1 }}
          />
        </Animated.View>
      )}
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Image
              source={require('../../assets/logo_dorado.webp')}
              style={{ width: 120, height: 120, marginBottom: 16 }}
            />
            <Image
              source={require('../../assets/logo_sabino_text.webp')}
              style={{ width: 325, height: 72, marginBottom: 16 }}
            />
            <TextInput
              label="Correo"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              style={{ width: '90%' }}
              autoFocus
            />
            <TextInput
              label="Contraseña"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              style={{ width: '90%', marginTop: 16 }}
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={!secureTextEntry ? 'eye' : 'eye-off'}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                    return false;
                  }}
                />
              }
            />
            <View style={styles.buttonContainer}>
              <Button.Primary
                disabled={
                  isLoading ||
                  !formik.isValid ||
                  formik.values.email === '' ||
                  formik.values.password === ''
                }
                onPress={() => formik.handleSubmit()}
              >
                Ingresar
              </Button.Primary>
              <Button.PrimaryOutline disabled={isLoading} onPress={handleGoto}>
                Registrar
              </Button.PrimaryOutline>
            </View>
            <Typography.BodySmall>o</Typography.BodySmall>
            <View style={styles.buttonContainer}>
              <Button.PrimaryOutline
                disabled={isLoading}
                onPress={handleAnonym}
                icon={
                  <IconMaterialCI
                    name="glasses"
                    color={BLUE_DARK}
                    size={32}
                    style={{ marginRight: 8 }}
                  />
                }
              >
                Entrar como visitante
              </Button.PrimaryOutline>
            </View>
            <Typography.BodySmall>
              {DeviceInfo.getVersion()}
            </Typography.BodySmall>
          </View>
          {isLoading && <Loader />}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Escala la imagen para cubrir toda la pantalla
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
