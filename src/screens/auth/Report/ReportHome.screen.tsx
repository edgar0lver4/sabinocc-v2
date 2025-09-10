import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  BLUE_DARK,
  BLUE_LIGHT,
  DANGER,
  DANGER_DARK,
} from '../../../styles/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ReportNotificationsScreen from './Tabs/RoportNotifications.screen';
import ReportIncidentScreen from './Tabs/ReportIncidents.screen';
import {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TNotification, TReport} from '../../../types/report.type';
import ReportVisitScreen from './Tabs/ReportVisits.screen';
import {
  getReportService,
  getReptNotService,
} from '../../../services/reports/service';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import Loader from '../../../components/loader';
import {useAppDispatch, useAppSelector} from '../../../redux';
import {closeLoader} from '../../../redux/slicer/loader.slicer';
import Header from '../../../components/header';
import {RoutesName} from '../../../routes/names.enum';

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    renderLabel={({route, focused, color}) => {
      return <Text style={{color, fontSize: 12}}>{route.title}</Text>;
    }}
    renderIcon={({focused, color}) => (
      <Icon name={focused ? 'circle' : 'circle-o'} color={color} />
    )}
    style={style.tabBar}
  />
);

const ReportHomeScreen = ({navigation: {navigate}}: any) => {
  const [index, setIndex] = useState(0);
  const [notiList, setNotiList] = useState<Array<TNotification>>([]);
  const [repList, setRepList] = useState<Array<TReport>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [routes] = useState([
    {key: 'first', title: 'Notificaciones'},
    {key: 'second', title: 'Incidentes'},
    {key: 'three', title: 'Visitas'},
  ]);
  const sessionStore = useAppSelector(store => store.session.selectedProperty);
  const dispatch = useAppDispatch();

  const subtitle = `Casa ${sessionStore?.name} - ${sessionStore?.proyecto}`;

  const init = async () => {
    setIsLoading(true);
    const report: Array<TReport> = await getReportService();
    const notifi: Array<TNotification> = await getReptNotService();
    setIsLoading(false);

    report.length > 0 && setRepList(report);
    notifi.length > 0 && setNotiList(notifi);
  };

  const handleGoto = (id: string) => {
    navigate('ReportShow', {id: id});
  };

  const handlGotoProfile = () => navigate(RoutesName.PROFILE);

  const renderScene = SceneMap({
    first: () => (
      <ReportNotificationsScreen
        notifications={notiList}
        onPress={handleGoto}
      />
    ),
    second: () => (
      <ReportIncidentScreen reports={repList} onPress={handleGoto} />
    ),
    three: () => <ReportVisitScreen reports={repList} onPress={handleGoto} />,
  });

  useFocusEffect(
    useCallback(() => {
      init();
      dispatch(closeLoader());
    }, []),
  );

  return (
    <SafeAreaView style={style.container}>
      {isLoading && <Loader title="Cargando datos" />}
      <Header
        handleLogout={handlGotoProfile}
        title="Reportes"
        subtitle={subtitle}
        variant="subscreen"
      />
      <View style={style.scrollContainer}>
        <View style={style.cardsSection}>
          <View style={style.cardContainer}>
            <Text style={style.cardTitle}>{notiList.length}</Text>
            <Text style={style.cardDescription}>Notificaciones</Text>
          </View>
          <View style={style.cardContainer}>
            <Text style={style.cardTitleDanger}>{repList.length}</Text>
            <Text style={style.cardDescription}>Incidentes Reportados</Text>
          </View>
        </View>
        <Button
          mode="contained"
          buttonColor={DANGER_DARK}
          onPress={() => navigate('Report')}>
          <Icon name="home" size={18} />
          Reportar Incidente
        </Button>
        <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{marginTop: 16}}
          initialLayout={{height: 750}}
        />
      </View>
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
    paddingVertical: 12,
    paddingBottom: 16,
  },
  cardsSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: BLUE_DARK,
    width: 130,
    height: 130,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardTitleDanger: {
    fontSize: 40,
    fontWeight: 'bold',
    color: DANGER,
  },
  cardDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    backgroundColor: BLUE_DARK,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
});

export default ReportHomeScreen;
