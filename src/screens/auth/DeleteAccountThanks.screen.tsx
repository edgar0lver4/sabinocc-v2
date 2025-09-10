import IconFather from 'react-native-vector-icons/Feather';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {BLUE_DARK} from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch} from '../../redux';
import {closeSession} from '../../redux/slicer/session.slicer';
import storage from '../../db/storage';
import {EStorage} from '../../enums/storage.enum';

const DeleteAccountThanksScreen = () => {
  const dispatch = useAppDispatch();
  useFocusEffect(() => {
    setTimeout(async () => {
      await storage.remove({key: EStorage.login});
      dispatch(closeSession());
    }, 3000);
  });
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <View style={style.textContainer}>
        <IconFather name="check-circle" size={64} color="#fff" />
        <Text style={style.text}>
          Tu cuenta está en proceso de cancelación ;)
        </Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_DARK,
    padding: 16,
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    marginTop: 16,
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default DeleteAccountThanksScreen;
