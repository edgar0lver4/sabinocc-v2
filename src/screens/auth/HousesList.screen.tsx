import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BLUE_LIGHT } from '../../styles/colors';
import Header from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../redux';
import CardList from '../../components/cardList';
import { Property } from '../../types/properties.type';
import { EStorage } from '../../enums/storage.enum';
import storage from '../../db/storage';
import {
  closeSession,
  setHouseSelectedRdx,
} from '../../redux/slicer/session.slicer';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '../../routes/names.enum';

const HousesListScreen = () => {
  const sessionStore = useAppSelector(store => store.session);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const data: Property[] = sessionStore.properties;

  const renderItem = useCallback(
    (item: Property) => {
      const handlePress = () => {
        dispatch(setHouseSelectedRdx(item));
        navigate(RoutesName.PROFILE);
      };
      return (
        <CardList
          title={`Casa | ${item.name}`}
          subtitle={`Proyecto: ${item.proyecto}`}
          onPress={handlePress}
        />
      );
    },
    [data],
  );

  const handleLogout = async () => {
    dispatch(closeSession());
    await storage.remove({ key: EStorage.login });
  };
  return (
    <SafeAreaView style={style.container}>
      <Header
        title="Lista de propiedades"
        subtitle="Seleccione una propiedad por favor"
        handleLogout={handleLogout}
      />
      <FlatList
        style={style.list}
        data={data}
        renderItem={({ item }) => renderItem(item)}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
  },
  list: {
    marginTop: 16,
  },
});

export default HousesListScreen;
