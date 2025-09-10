import { useCallback } from 'react';
import { ScreenContainer } from '../../../components/container';
import Header from '../../../components/header';
import { useProyects } from '../../../hooks/operator/useProyects';
import { Proyect } from '../../../core/proyects/type';
import CardList from '../../../components/cardList';
import { FlatList } from 'react-native';
import { useLoader } from '../../../hooks/useLoader';
import { useModalError } from '../../../hooks/useModalError';
import { useAppDispatch } from '../../../redux';
import { closeSession } from '../../../redux/slicer/session.slicer';
import { EStorage } from '../../../enums/storage.enum';
import storage from '../../../db/storage';

const ListProyectsScreen = () => {
  const { proyects, setProyect, setPropertiesWithIdProyect } = useProyects();
  const { hiddeLoader, showLoader } = useLoader();
  const { showModalError } = useModalError();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    showLoader('');
    dispatch(closeSession());
    await storage.remove({ key: EStorage.login });
    hiddeLoader();
  };

  const renderItem = useCallback(
    (item: Proyect) => {
      const handlePress = async () => {
        try {
          showLoader('Cargando propiedades');
          setProyect(item);
          await setPropertiesWithIdProyect(item.id);
        } catch (e) {
          showModalError(`${e}`);
        }
        hiddeLoader();
      };
      return (
        <CardList
          title={`Proyecto | ${item.name}`}
          subtitle={item.description || ''}
          onPress={handlePress}
        />
      );
    },
    [proyects],
  );

  return (
    <ScreenContainer>
      <Header
        title="Lista de proyectos"
        subtitle="Seleccione un proyecto para atender"
        handleLogout={handleLogout}
      />
      <FlatList
        style={{ marginHorizontal: 4, marginVertical: 12 }}
        data={proyects}
        renderItem={({ item }) => renderItem(item)}
      />
    </ScreenContainer>
  );
};

export default ListProyectsScreen;
