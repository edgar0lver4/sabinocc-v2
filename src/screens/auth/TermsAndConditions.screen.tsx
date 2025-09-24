import {SafeAreaView} from 'react-native-safe-area-context';
import {BLUE_DARK, BLUE_LIGHT} from '../../styles/colors';
import {ScrollView, StatusBar, StyleSheet, Text} from 'react-native';
import {useConfiguration} from '../../hooks/useConfiguration';

const TermsAndConditionsScreen = () => {
  const {tyc} = useConfiguration();

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <ScrollView style={style.scrollContainer}>
        <Text style={style.textNormal}>{tyc?.val}</Text>
      </ScrollView>
    </SafeAreaView>
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

export default TermsAndConditionsScreen;
