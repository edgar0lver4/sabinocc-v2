import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { BLUE_DARK, BLUE_LIGHT, YELLOW_LIGHT } from '../../styles/colors';
import { useCallback, useState } from 'react';
import { TActivity } from '../../services/activities/services.type';
import { getActivitiesList } from '../../services/activities/services';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/loader';
import { FilterActivity } from '../../utils/filters';
import CardActivities from '../../components/card.activies';
import { useAccountInfo } from '../../hooks/useAccountInfo';
import Header from '../../components/header';
import { RoutesName } from '../../routes/names.enum';

const ActivityListScreen = ({ navigation: { navigate } }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activityList, setActivityList] = useState<Array<TActivity>>([]);
  const { headerSub } = useAccountInfo();

  const initScreen = async () => {
    setIsLoading(true);
    const activities = await getActivitiesList();
    if (activities.length > 0) {
      const sorting = activities.sort(FilterActivity.UP);
      setActivityList(sorting);
    }
    setIsLoading(false);
  };

  const gotoScreen = (id: number) => {
    navigate('Activity', { id: id });
  };

  useFocusEffect(
    useCallback(() => {
      initScreen();
    }, []),
  );

  const handleLogout = () => {
    navigate(RoutesName.PROFILE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <Header
        title="Proximas actividades"
        subtitle={headerSub}
        variant="subscreen"
        handleLogout={handleLogout}
      />
      {isLoading && <Loader />}
      <ScrollView style={styles.scrollContainer}>
        {activityList.map((itm, i) => (
          <CardActivities key={'k-' + i} itm={itm} onPress={gotoScreen} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
  },
  titleText: {
    color: YELLOW_LIGHT,
    fontSize: 24,
    letterSpacing: 0.5,
    lineHeight: 32.4,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default ActivityListScreen;
