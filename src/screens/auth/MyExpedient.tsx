import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { BLUE_DARK, BLUE_LIGHT } from '../../styles/colors';
import { useCallback, useState } from 'react';
import { TDocuments } from '../../types/documents.type';
import { getExpedientList } from '../../services/documents/service';
import { useFocusEffect } from '@react-navigation/native';
import CardInformation from '../../components/card.information';
import { dateISO } from '../../utils/format';
import { useDispatch } from 'react-redux';
import { closeLoader, showLoaderRdx } from '../../redux/slicer/loader.slicer';
import Typography from '../../components/typography';
import LottieView from 'lottie-react-native';
import Header from '../../components/header';
import { RoutesName } from '../../routes/names.enum';
import { useAccountInfo } from '../../hooks/useAccountInfo';

const ANIM_EMPTY_LIST = require('../../animations/empty-list.json');

const MyExpedientScreen = ({ navigation: { navigate } }: any) => {
  const [documentsList, setDocumentsList] = useState<Array<TDocuments>>([]);
  const [withError, setWithError] = useState(false);
  const { headerSub } = useAccountInfo();
  const dispatch = useDispatch();

  const initScreen = async () => {
    dispatch(showLoaderRdx({ isOpen: true, title: 'Cargando expediente' }));
    const expedient = await getExpedientList();
    if (expedient.length > 0) {
      setDocumentsList(expedient);
    } else {
      setWithError(true);
    }
    dispatch(closeLoader());
  };

  useFocusEffect(
    useCallback(() => {
      initScreen();
    }, []),
  );
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <Header
        variant="subscreen"
        title="Mi expediente"
        subtitle={headerSub}
        handleLogout={() => navigate(RoutesName.PROFILE)}
      />
      {withError && (
        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginVertical: 32,
              marginHorizontal: 32,
            }}
          >
            <LottieView
              source={ANIM_EMPTY_LIST}
              loop
              autoPlay
              style={{ flex: 1 }}
            />
          </View>
          <Typography.Title>Sin información disponible</Typography.Title>
        </View>
      )}
      <ScrollView style={style.scrollContainer}>
        {documentsList.map((itm, idx) => (
          <CardInformation
            key={'k-' + idx}
            title={itm.title}
            documentURL={itm.documentURL}
            createDate={itm.createDate}
            modificationDate={dateISO(itm.modificationDate)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
});

export default MyExpedientScreen;
