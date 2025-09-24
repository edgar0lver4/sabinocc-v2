import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BLUE_DARK, BLUE_LIGHT } from '../../styles/colors';
import { useCallback, useState } from 'react';
import { getHouseInformationList } from '../../services/documents/service';
import { useFocusEffect } from '@react-navigation/native';
import CardInformation from '../../components/card.information';
import { dateISO } from '../../utils/format';
import { TDocuments } from '../../types/documents.type';
import { useDispatch } from 'react-redux';
import { closeLoader, showLoaderRdx } from '../../redux/slicer/loader.slicer';
import LottieView from 'lottie-react-native';
import Typography from '../../components/typography';
import Header from '../../components/header';
import { useAccountInfo } from '../../hooks/useAccountInfo';
import { RoutesName } from '../../routes/names.enum';

const ANIM_EMPTY_LIST = require('../../animations/empty-list.json');

const HouseInformationScreen = ({ navigation: { navigate } }: any) => {
  const [documentsList, setDocumentsList] = useState<Array<TDocuments>>([]);
  const [withError, setWithError] = useState(false);
  const { headerSub } = useAccountInfo();
  const dispatch = useDispatch();

  const initScreen = async () => {
    dispatch(showLoaderRdx({ isOpen: true, title: 'Cargando información' }));
    const houseInformation = await getHouseInformationList();
    if (houseInformation.length > 0) {
      setDocumentsList(houseInformation);
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
      <Header
        variant="subscreen"
        title="Información de mi propiedad"
        subtitle={headerSub}
        handleLogout={() => navigate(RoutesName.PROFILE)}
      />
      <StatusBar backgroundColor={BLUE_DARK} />
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
              style={{ flex: 1 }}
              source={ANIM_EMPTY_LIST}
              loop
              autoPlay
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
    paddingHorizontal: 16,
  },
});

export default HouseInformationScreen;
