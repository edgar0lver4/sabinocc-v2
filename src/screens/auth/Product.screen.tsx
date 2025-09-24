import IconFundation from 'react-native-vector-icons/Foundation';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Loader from '../../components/loader';
import {
  createLeadProduct,
  getProductById,
} from '../../services/products/service';
import YoutubeIframe from 'react-native-youtube-iframe';
import {
  BLUE,
  BLUE_DARK,
  BLUE_LIGHT,
  DANGER_DARK,
  STEEL_10,
  STEEL_20,
  YELLOW_LIGHT,
} from '../../styles/colors';
import { numberToPrice } from '../../utils/format';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyle from '../../styles/globals';
import { TProductDetailResponse } from '../../services/products/services.types';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { HelperText, TextInput } from 'react-native-paper';
import { useAppSelector } from '../../redux';
import { useFormik } from 'formik';
import RegisterClientSchema from '../../schemas/register.client.validation.schema';
import Lottie from 'lottie-react-native';
const ProductScreen = ({
  navigation: { navigate },
  route: { params },
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [productDescription, setProductDescription] =
    useState<TProductDetailResponse>();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const sessionStore = useAppSelector(itm => itm.session);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const INITIAL_VALUES = {
    name: sessionStore.name !== 'Visitante' ? sessionStore.name : '',
    email: sessionStore.email,
    phone: '',
    id_product: params.id,
  };

  const onCreateLead = async (e: typeof INITIAL_VALUES) => {
    const create = await createLeadProduct(e);
    if (create) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowForm(false);
        setShowAnimation(false);
      }, 2000);
    } else {
      Alert.alert('Intenta mandar la información más tarde');
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onCreateLead,
    validationSchema: RegisterClientSchema,
  });

  const toggleShowForm = () => setShowForm(!showForm);

  const initScreen = async () => {
    setIsLoading(true);
    const product = await getProductById(params.id);
    if (product !== undefined) {
      setProductDescription(product);
    }
    setIsLoading(false);
  };

  const handleOpenSite = async (url: string) => {
    const urlReal = Platform.select({
      ios: `http://maps.apple.com/?ll=${productDescription?.lat},${productDescription?.lon}`,
      android: url,
    });
    if (!!urlReal) {
      const support = await Linking.canOpenURL(urlReal);
      if (support) {
        Linking.openURL(urlReal);
      } else {
        Alert.alert('No se puede abrir la url');
      }
    }
  };

  const handleOpenMap = async () => {
    const support = await Linking.canOpenURL(productDescription!.ubicationURL);
    if (support) {
      Linking.openURL(productDescription!.ubicationURL);
    } else {
      Alert.alert('No se puede abrir la url');
    }
  };

  const snapPoints = showKeyboard ? ['90%', '95%'] : ['58%', '75%'];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowKeyboard(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      initScreen();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={BLUE_LIGHT} />
      <ScrollView>
        {productDescription && (
          <View>
            {productDescription.videoId !== null ? (
              <YoutubeIframe
                play
                height={216}
                videoId={productDescription.videoId}
              />
            ) : (
              <Image
                source={{ uri: productDescription.image }}
                style={style.principalImage}
              />
            )}
            <View
              style={{
                padding: 16,
                backgroundColor: BLUE_LIGHT,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {Platform.OS === 'ios' && !showForm && (
                <TouchableOpacity
                  onPress={toggleShowForm}
                  style={style.floatIosButton}
                >
                  <Text style={style.floatButtonText}>
                    Solicitar más información
                  </Text>
                </TouchableOpacity>
              )}
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                  <Text
                    style={{ fontWeight: 'bold', color: '#fff', fontSize: 28 }}
                  >
                    {productDescription.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: YELLOW_LIGHT,
                      fontSize: 20,
                      letterSpacing: 1,
                    }}
                  >
                    Precio desde {numberToPrice(productDescription.price)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 32,
                  }}
                  onPress={() => handleOpenSite(productDescription.web)}
                >
                  <IconFundation name="web" size={42} color={BLUE} />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  textAlign: 'justify',
                  color: '#fff',
                  letterSpacing: 0.5,
                  marginTop: 16,
                  fontSize: 14,
                }}
              >
                {productDescription.description}
              </Text>
              <View style={globalStyle.my_4}>
                <Text
                  style={{ color: '#fff', fontWeight: '600', letterSpacing: 1 }}
                >
                  Úbicacion
                </Text>
                <View
                  style={{ flexDirection: 'row', marginTop: 8, paddingEnd: 16 }}
                >
                  <IconMaterial
                    name="location-on"
                    size={32}
                    color={DANGER_DARK}
                  />
                  <Text
                    style={{
                      ...globalStyle.typography_body_semibold,
                      color: '#fff',
                    }}
                  >
                    {productDescription.ubication}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 16,
                    height: 40,
                    backgroundColor: BLUE_DARK,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 8,
                    borderRadius: 8,
                  }}
                  onPress={handleOpenMap}
                >
                  <IconFundation name="map" size={32} color={'#fff'} />
                  <Text
                    style={{
                      ...globalStyle.typography_body_semibold,
                      color: '#fff',
                      marginLeft: 16,
                    }}
                  >
                    Abrir en maps
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  display: 'flex',
                  marginBottom: 16,
                }}
              >
                <IconFundation name="photo" color={'#fff'} size={24} />
                <Text
                  style={{
                    ...globalStyle.typography_body_semibold,
                    color: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 16,
                    fontSize: 16,
                  }}
                >
                  Galería
                </Text>
              </View>
              {productDescription.images !== null &&
                productDescription.images.map((itm, id) => (
                  <Image
                    key={`key-${id}`}
                    source={{ uri: itm }}
                    style={{ width: '100%', height: 260, marginBottom: 16 }}
                  />
                ))}
            </View>
          </View>
        )}
        {isLoading && <Loader />}
      </ScrollView>
      {Platform.OS === 'android' && (
        <TouchableOpacity onPress={toggleShowForm} style={style.floatButton}>
          <Text style={style.floatButtonText}>Solicitar más información</Text>
        </TouchableOpacity>
      )}
      {showForm && (
        <BottomSheet
          snapPoints={snapPoints}
          enableDynamicSizing
          ref={bottomSheetRef}
          index={0}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              padding: 16,
            }}
          >
            {!showAnimation ? (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '600',
                      marginBottom: 16,
                    }}
                  >
                    {productDescription?.name}
                  </Text>
                  <TouchableOpacity onPress={toggleShowForm}>
                    <IconMaterial name="close" size={32} />
                  </TouchableOpacity>
                </View>
                <TextInput
                  label="Nombre"
                  mode="outlined"
                  style={{ width: '100%', marginBottom: 8 }}
                  value={formik.values.name}
                  error={formik.errors.name !== undefined}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
                {formik.errors.name && (
                  <HelperText type="error">{formik.errors.name}</HelperText>
                )}
                <TextInput
                  label="Correo"
                  mode="outlined"
                  style={{ width: '100%', marginBottom: 8 }}
                  value={formik.values.email}
                  error={formik.errors.email !== undefined}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                {formik.errors.email && (
                  <HelperText type="error">{formik.errors.email}</HelperText>
                )}
                <TextInput
                  label="Teléfono"
                  mode="outlined"
                  style={{ width: '100%', marginBottom: 8 }}
                  value={formik.values.phone}
                  error={formik.errors.phone !== undefined}
                  onChangeText={formik.handleChange('phone')}
                  onBlur={formik.handleBlur('phone')}
                  keyboardType="numeric"
                />
                {formik.errors.phone && (
                  <HelperText type="error">{formik.errors.phone}</HelperText>
                )}
                <TouchableOpacity
                  onPress={() => formik.handleSubmit()}
                  disabled={!formik.isValid || formik.values.phone === ''}
                  style={
                    formik.isValid && formik.values.phone !== ''
                      ? style.formButton
                      : style.formButtonDisabled
                  }
                >
                  <Text
                    style={
                      formik.isValid && formik.values.phone !== ''
                        ? style.floatButtonText
                        : style.floatButtonTextDisabled
                    }
                  >
                    Solicitar más información
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Lottie
                  source={require('../../animations/success.json')}
                  autoPlay
                  style={{ flex: 1 }}
                />
                <Text>Información enviada</Text>
              </>
            )}
          </BottomSheetView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  floatButton: {
    width: '90%',
    height: 40,
    backgroundColor: BLUE_DARK,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    left: 20,
    elevation: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  floatIosButton: {
    width: '100%',
    height: 40,
    marginBottom: 16,
    backgroundColor: BLUE_DARK,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOffset: { width: 10, height: 10 },
    borderRadius: 8,
  },
  floatButtonText: {
    color: YELLOW_LIGHT,
    fontWeight: 'bold',
  },
  formButton: {
    width: 300,
    height: 40,
    backgroundColor: BLUE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  formButtonDisabled: {
    width: 300,
    height: 40,
    backgroundColor: STEEL_10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  floatButtonTextDisabled: {
    color: STEEL_20,
    fontWeight: 'bold',
  },
  principalImage: {
    width: '100%',
    height: 180,
  },
});

export default ProductScreen;
