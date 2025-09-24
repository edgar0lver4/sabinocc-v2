import {View} from 'react-native';
import Section from './section';
import MenuButton from './menu.buttons';
import MenuButtonFather from './menu.buttons.father';
import {EStorage} from '../enums/storage.enum';
import storage from '../db/storage';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../redux';
import {showLoaderRdx} from '../redux/slicer/loader.slicer';
import MenuButtonLucide from './menu.buttons.lucide';
import {RoutesName} from '../routes/names.enum';

type Props = {
  type: string;
  navigation: any;
};
const MenuApp = ({type, navigation}: Props) => {
  const dispatch = useAppDispatch();

  const handleGoto = (screen: string) => {
    navigation.navigate(screen);
  };

  const handlGotoReport = async () => {
    dispatch(showLoaderRdx({isOpen: true, title: 'Cargando Reportes'}));
    try {
      const load = await storage.load({
        key: EStorage.reportTutorial,
        autoSync: true,
        syncInBackground: true,
      });
      if (load.finish) handleGoto('ReportHome');
      else handleGoto('ReportTutorial');
    } catch (e) {
      handleGoto('ReportTutorial');
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {type === 'client' && (
        <Section title="Mi cuenta">
          <MenuButton
            iconName="home"
            title="Datos de mi casa"
            onPress={() => handleGoto('HouseInformation')}
          />
          <MenuButton
            iconName="file-text"
            title="Mi expediente"
            onPress={() => handleGoto('MyExpedient')}
          />
          <MenuButton
            iconName="headphones"
            title="Reportes"
            onPress={() => handlGotoReport()}
          />
          <MenuButton
            iconName="lightbulb-o"
            title="Actividades"
            onPress={() => handleGoto('ActivitiesList')}
          />
        </Section>
      )}
      <Section title="General">
        <MenuButtonFather
          iconName="help-circle"
          title="Contacto"
          onPress={() => handleGoto('ContactLinks')}
        />
        <MenuButton
          iconName="users"
          title="Desarrollos Sabino"
          onPress={() => handleGoto('ProductsList')}
        />
        <MenuButton
          iconName="shield"
          title="Términos y condiciones de servicio"
          onPress={() => handleGoto('TermsAndConditions')}
        />
        {type === 'client' && (
          <>
            <MenuButton
              iconName="comments"
              title="Chatea con nosotros"
              onPress={() => handleGoto(RoutesName.CHAT)}
            />
            <MenuButtonLucide
              iconName="arrow-right-left"
              title="Cambiar propiedad"
              onPress={() => handleGoto(RoutesName.HOUSESELECT)}
            />
            <MenuButton
              iconName="trash"
              title="Eliminar cuenta"
              onPress={() => handleGoto('DeleteAccount')}
            />
          </>
        )}
      </Section>
    </View>
  );
};

export default MenuApp;
