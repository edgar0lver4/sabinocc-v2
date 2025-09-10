import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE_DARK, BLUE_LIGHT, YELLOW_LIGHT} from '../../styles/colors';
import {useAppSelector} from '../../redux';
import {useFormik} from 'formik';
import {TextInput} from 'react-native-paper';
import Button from '../../components/buttons';
import {useState} from 'react';
import Loader from '../../components/loader';
import {deleteAccountService} from '../../services/users/service';
import {useConfiguration} from '../../hooks/useConfiguration';

const DeleteAccountScreen = ({navigation: {navigate}}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {tdel} = useConfiguration();

  const sessionStore = useAppSelector(itm => itm.session);
  const INITAL_VALUES = {
    email: sessionStore.email,
    password: '',
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    const deleteAccount = await deleteAccountService(e);
    if (deleteAccount) {
      navigate('DeleteAccountThanks');
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: INITAL_VALUES,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <SafeAreaView style={style.container}>
        <StatusBar backgroundColor={BLUE_DARK} />
        <ScrollView style={style.scrollContainer}>
          <Text style={{...style.textNormal, marginBottom: 16}}>
            {tdel?.val}
          </Text>
          <Text style={{...style.textBold, marginBottom: 16}}>
            Por favor, escribe tu contraseña para eliminar tu cuenta
          </Text>
          <TextInput
            label="Contraseña"
            value={formik.values.password}
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
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.errors.password !== undefined}
          />
          <View style={{marginBottom: 32}}>
            <Button.Danger
              onPress={() => formik.handleSubmit()}
              disabled={formik.values.password === '' || !formik.isValid}>
              Eliminar cuenta
            </Button.Danger>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <Loader />}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  textNormal: {
    color: '#fff',
    textAlign: 'justify',
    fontSize: 16,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  textBold: {
    color: '#fff',
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default DeleteAccountScreen;
