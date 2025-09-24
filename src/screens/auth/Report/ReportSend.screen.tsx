import Lottie from 'lottie-react-native';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BLUE_DARK } from '../../../styles/colors';
import { Button } from 'react-native-paper';
import ANIMATION from '../../../animations/send_report.json';

const ReportSendedScreen = ({ navigation: { navigate } }: any) => {
  const handleContinue = () => {
    navigate('ReportHome');
  };

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Su reporte se ha enviado</Text>
      <View style={{ height: '80%' }}>
        <Lottie source={ANIMATION} autoPlay style={{ flex: 1 }} />
      </View>
      <View style={Platform.OS === 'ios' && { marginHorizontal: 16 }}>
        <Button
          onPress={handleContinue}
          mode="contained"
          textColor={'#fff'}
          buttonColor={BLUE_DARK}
        >
          Continuar
        </Button>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 18,
    lineHeight: 22,
    fontSize: 20,
    color: BLUE_DARK,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ReportSendedScreen;
