import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux';
import AppRoutes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import storage from './src/db/storage';
import {
  closeSession,
  setSessionInfoRdx,
} from './src/redux/slicer/session.slicer';
import { EStorage } from './src/enums/storage.enum';
import { Button, Modal, PaperProvider, Portal } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import { BLUE_DARK } from './src/styles/colors';
import { jwtDecode } from 'jwt-decode';
import GlobalLoader from './src/components/globalLoader';
import ModalErrors from './src/components/modal.errors';
import { NewtworkInformation } from './src/components/NetworkInformation';
import { configure } from 'react-native-crisp-chat-sdk';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const initApp = useCallback(async () => {
    try {
      const load = await storage.load({
        key: EStorage.login,
        autoSync: true,
        syncInBackground: true,
      });
      if (load) {
        store.dispatch(setSessionInfoRdx(load));
        const decode = jwtDecode(load.token);
        const expired = new Date(decode.exp || '').getTime();
        const dataNow = Math.floor(new Date().getTime() / 1000);
        const rest = expired - dataNow;
        rest <= 0 && setShowModal(true);
      }
    } catch (e) {
      const error: any = e;
      console.log('Error:', error);
    }
  }, []);

  const handleClear = async () => {
    await storage.remove({ key: EStorage.login });
    setShowModal(false);
    store.dispatch(closeSession());
  };

  useEffect(() => {
    initApp();
    configure('4d23d2a2-9706-4f80-a587-782a4e5fb975');
    const unsubscribe = setInterval(async () => {
      const token = store.getState().session.token;
      const decode = jwtDecode(token);
      const expired = new Date(decode.exp || '').getTime();
      const dataNow = Math.floor(new Date().getTime() / 1000);
      const rest = expired - dataNow;
      rest <= 0 && token !== '' && setShowModal(true);
    }, 3000);

    return () => clearInterval(unsubscribe);
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <ModalErrors />
            <GlobalLoader />
            <AppRoutes />
            <NewtworkInformation />
          </NavigationContainer>
          <Portal>
            <Modal visible={showModal} contentContainerStyle={style.modal}>
              <Text style={style.title}>Sesión expirada</Text>
              <Text style={style.description}>
                Su sesión ha expirado, favor de volver a ingresar
              </Text>
              <Button
                mode="contained"
                style={{ marginTop: 16 }}
                buttonColor={BLUE_DARK}
                onPress={handleClear}
              >
                Iniciar Sesión
              </Button>
            </Modal>
          </Portal>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: 360,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: BLUE_DARK,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    color: BLUE_DARK,
  },
});

export default App;
