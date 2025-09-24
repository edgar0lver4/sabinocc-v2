import CrispChat, {
  configure,
  setUserEmail,
  setUserNickname,
  setTokenId,
  resetSession,
  show,
} from 'react-native-crisp-chat-sdk';
import { useAppSelector } from '../../redux';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';
import MenuButton from '../../components/menu.buttons';
import { BLUE_LIGHT } from '../../styles/colors';

const ChatScreen = () => {
  const { email, name } = useAppSelector(store => store.session);
  const { goBack } = useNavigation();

  useEffect(() => {
    setTokenId(`${email}-${name}`);
    setUserEmail(email);
    setUserNickname(name);

    return () => resetSession();
  }, [email, name]);

  return (
    <View style={styles.container}>
      <Header title="Chatea con nosotros" handleLogout={goBack} />
      <View style={styles.buttonContainer}>
        <MenuButton iconName="comments" onPress={show} title="Abrir chat" />
      </View>
      <CrispChat />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default ChatScreen;
