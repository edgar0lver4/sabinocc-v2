import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../../components/container';
import Header from '../../../components/header';
import { useAppSelector } from '../../../redux';
import { useCallback, useMemo } from 'react';
import { PropertyOperator } from '../../../core/operator/types';
import CardList from '../../../components/cardList';
import { FlatList } from 'react-native';
import { useProyects } from '../../../hooks/operator/useProyects';
import { RoutesName } from '../../../routes/names.enum';

const ListPropertiesScreen = () => {
  const { goBack, navigate } = useNavigation();
  const { setPropertyOperator } = useProyects();
  const sessionStore = useAppSelector(store => store.session);
  const operatorStore = useAppSelector(store => store.operator);

  const list = useMemo(() => {
    return operatorStore.porperties;
  }, [operatorStore]);

  const renderItem = useCallback(
    (item: PropertyOperator) => {
      const handlePress = async () => {
        setPropertyOperator(item);
        navigate(RoutesName.PROFILE_OPERATOR);
      };
      return (
        <CardList
          title={`${item.prototipo} | ${item.numero}`}
          subtitle="Selecciona para ver sus tickets abiertos"
          onPress={handlePress}
        />
      );
    },
    [list],
  );

  return (
    <ScreenContainer>
      <Header
        handleLogout={goBack}
        title={`Proyecto | ${sessionStore.selectedProyect?.name}`}
        subtitle="Seleccione una propiedad del proyecto"
        variant="subscreen"
      />
      <FlatList
        style={{ marginHorizontal: 4, marginVertical: 12 }}
        data={list}
        renderItem={({ item }) => renderItem(item)}
      />
    </ScreenContainer>
  );
};

export default ListPropertiesScreen;
