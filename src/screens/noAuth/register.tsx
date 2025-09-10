import {
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { BLUE_DARK, BLUE_LIGHT, BLUE_SUPER_LIGHT } from '../../styles/colors';
import { HelperText, TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import globalStyle from '../../styles/globals';
import RegisterSchema from '../../schemas/register.validation.schema';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../components/loader';
import { registerService } from '../../services/users/service';
import { useAppDispatch } from '../../redux';
import { setSessionInfoRdx } from '../../redux/slicer/session.slicer';
import storage from '../../db/storage';
import CheckingLabel from '../../components/checking.label';
import { EStorage } from '../../enums/storage.enum';
import Button from '../../components/buttons';
import { closeLoader, showLoaderRdx } from '../../redux/slicer/loader.slicer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TSession } from '../../types/session.types';

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [isValidLength, setIsValidLength] = useState(false);
  const [isValidUpper, setIsValidUpper] = useState(false);
  const [isValidLower, setIsValidLower] = useState(false);
  const [isValidSpecial, setIsValidSpecial] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const dispatch = useAppDispatch();

  const INITIAL_VALUES = {
    name: '',
    phone: '',
    email: '',
    password: '',
    customer_id: '',
  };

  const handleSubmit = async (e: any) => {
    dispatch(showLoaderRdx({ isOpen: true, title: 'Registrando usuario' }));
    Keyboard.dismiss();
    const { isRegisted, error, register } = await registerService(e);
    if (isRegisted) {
      console.log('register:', register);
      const body: TSession = {
        type: register.type,
        token: register.token,
        name: register.name,
        image: register.image,
        email: register.email,
        properties: register.propiedades,
      };
      dispatch(setSessionInfoRdx(body));
      storage.save({
        key: EStorage.login,
        data: body,
      });
    } else {
      console.log(error);
      Alert.alert(`Error al registrar: ${error}`);
    }
    dispatch(closeLoader());
  };

  const handleVerifyPass = (val: string) => {
    const rgxUpperCase = new RegExp(/[A-Z]/);
    const rgxLowercase = new RegExp(/[a-z]/);
    const rgxSpecial = new RegExp(/[!@#$%^&*()\-_,.?":{}|<>]/);

    if (val.length >= 8) {
      setIsValidLength(true);
    } else {
      setIsValidLength(false);
    }
    if (rgxUpperCase.test(val)) {
      setIsValidUpper(true);
    } else {
      setIsValidUpper(false);
    }
    if (rgxLowercase.test(val)) {
      setIsValidLower(true);
    } else {
      setIsValidLower(false);
    }
    if (rgxSpecial.test(val)) {
      setIsValidSpecial(true);
    } else {
      setIsValidSpecial(false);
    }

    formik.setFieldValue('password', val);
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: handleSubmit,
    validationSchema: RegisterSchema,
  });

  const IS_VALID_PASS =
    isValidLength && isValidUpper && isValidLower && isValidSpecial;

  const scrollViewRef = useRef<any>(null);

  const handleFocus = (ref: any, val?: number) => {
    if (!!scrollViewRef.current) {
      ref?.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x: any, y: any) => {
          const valy = val !== undefined ? val + y : y;
          scrollViewRef.current.scrollTo({ y: valy, animated: true });
        },
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardOffset(event.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOffset(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, marginBottom: keyboardOffset - 35 }}
      >
        <StatusBar backgroundColor={BLUE_DARK} />
        <ScrollView
          ref={scrollViewRef}
          style={{
            flex: 1,
            backgroundColor: BLUE_LIGHT,
            padding: 16,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TextInput
            label="Nombre"
            textColor={BLUE_DARK}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            style={globalStyle.my_2}
            error={formik.errors.name !== undefined}
            onFocus={e => handleFocus(e.target)}
          />
          {formik.errors.name && (
            <HelperText type="error">{formik.errors.name}</HelperText>
          )}
          <TextInput
            label="Telefono"
            textColor={BLUE_DARK}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            style={globalStyle.my_2}
            keyboardType="numeric"
            error={formik.errors.phone !== undefined}
            onFocus={e => handleFocus(e.target)}
          />
          {formik.errors.phone && (
            <HelperText type="error">{formik.errors.phone}</HelperText>
          )}
          <TextInput
            label="Correo"
            textColor={BLUE_DARK}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            style={globalStyle.my_2}
            error={formik.errors.email !== undefined}
            onFocus={e => handleFocus(e.target)}
          />
          {formik.errors.email && (
            <HelperText type="error">{formik.errors.email}</HelperText>
          )}
          <TextInput
            label="Contraseña"
            textColor={BLUE_DARK}
            onChangeText={handleVerifyPass}
            onBlur={formik.handleBlur('password')}
            style={globalStyle.my_2}
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
            onFocus={e => handleFocus(e.target)}
            error={formik.errors.password !== undefined}
          />
          {!IS_VALID_PASS && (
            <>
              <CheckingLabel
                isChecked={isValidLength}
                label="Tamaño mínimo 8 carácteres"
              />
              <CheckingLabel
                isChecked={isValidUpper}
                label="Al menos una letra mayuscula"
              />
              <CheckingLabel
                isChecked={isValidLower}
                label="Al menos una letra minuscula"
              />
              <CheckingLabel
                isChecked={isValidSpecial}
                label="Al menos un carácter especial"
              />
            </>
          )}
          <TextInput
            label="Numero de cliente"
            textColor={BLUE_DARK}
            onChangeText={formik.handleChange('customer_id')}
            onBlur={formik.handleBlur('customer_id')}
            style={globalStyle.my_2}
            error={formik.errors.customer_id !== undefined}
            onFocus={e => handleFocus(e.target, 86)}
          />
          {formik.errors.customer_id && (
            <HelperText type="error">{formik.errors.customer_id}</HelperText>
          )}
          <View style={{ marginBottom: 16 }} />
          <Button.Primary
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid}
          >
            Completar Registro
          </Button.Primary>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
