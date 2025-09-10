import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/noAuth/login';
import RegisterScreen from '../screens/noAuth/register';
import ProfileScreen from '../screens/auth/Profile.screen';
import { BLUE_DARK } from '../styles/colors';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../redux';
import storage from '../db/storage';
import ProductsListScreen from '../screens/auth/ProductList.screen';
import ProductScreen from '../screens/auth/Product.screen';
import TermsAndConditionsScreen from '../screens/auth/TermsAndConditions.screen';
import ContactsLinkScreen from '../screens/auth/ContactLinks.screen';
import DeleteAccountScreen from '../screens/auth/DeleteAccount.screen';
import DeleteAccountThanksScreen from '../screens/auth/DeleteAccountThanks.screen';
import ActivityListScreen from '../screens/auth/ActivitiesList.screen';
import ActivityScreen from '../screens/auth/Activity.screen';
import HouseInformationScreen from '../screens/auth/HouseInformation.screen';
import MyExpedientScreen from '../screens/auth/MyExpedient';
import { EStorage } from '../enums/storage.enum';
import ReportHomeScreen from '../screens/auth/Report/ReportHome.screen';
import ReportTutorialScreen from '../screens/auth/Report/ReportTutorial.screen';
import ReportScreen from '../screens/auth/Report/Report.screen';
import ReportSendedScreen from '../screens/auth/Report/ReportSend.screen';
import ReportShowScreen from '../screens/auth/Report/ReportShow.screen';
import HousesListScreen from '../screens/auth/HousesList.screen';
import { RoutesName } from './names.enum';
import ChatScreen from '../screens/auth/chatScreen';
import { UserType } from '../core/users/enum';
import ListProyectsScreen from '../screens/auth/Operator/ListProyects';
import ListPropertiesScreen from '../screens/auth/Operator/ListProperties';
import ProfileOperatorScreen from '../screens/auth/Operator/ProfileOperator';
import TicketOperatorScreen from '../screens/auth/Operator/TicketOperator';

const Stack = createStackNavigator();

const NoAuthRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        title: 'Registrate con nosotros',
        headerStyle: { backgroundColor: BLUE_DARK },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const AuthRoutes = () => {
  const sessionStore = useAppSelector(store => store.session);
  const IS_ANONIM = sessionStore.type === UserType.ANONIM;
  const IS_ROUTE_OPERATOR = sessionStore.type === UserType.OPERATOR;

  const ROUTE_ANONYM = IS_ANONIM ? RoutesName.PROFILE : RoutesName.HOUSESELECT;
  const ROUTE_OPERATOR = IS_ROUTE_OPERATOR
    ? RoutesName.LIST_PROYECTS
    : ROUTE_ANONYM;

  return (
    <Stack.Navigator initialRouteName={ROUTE_OPERATOR}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.HOUSESELECT}
        component={HousesListScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.PROFILE}
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.LIST_PROYECTS}
        component={ListProyectsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.LIST_PROPERTIES}
        component={ListPropertiesScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.PROFILE_OPERATOR}
        component={ProfileOperatorScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.TICKET_OPERATOR}
        component={TicketOperatorScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.CHAT}
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: BLUE_DARK },
          headerTintColor: '#fff',
        }}
        name="ProductsList"
        component={ProductsListScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: BLUE_DARK },
          headerTintColor: '#fff',
        }}
        name="Product"
        component={ProductScreen}
      />
      <Stack.Screen
        options={{
          title: 'Términos y condiciones',
          headerStyle: { backgroundColor: BLUE_DARK },
          headerTintColor: '#fff',
        }}
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen
        options={{
          title: 'Contactanos',
          headerStyle: { backgroundColor: BLUE_DARK },
          headerTintColor: '#fff',
        }}
        name="ContactLinks"
        component={ContactsLinkScreen}
      />
      <Stack.Screen
        options={{
          title: 'Eliminar Cuenta',
          headerStyle: { backgroundColor: BLUE_DARK },
          headerTintColor: '#fff',
        }}
        name="DeleteAccount"
        component={DeleteAccountScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DeleteAccountThanks"
        component={DeleteAccountThanksScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ActivitiesList"
        component={ActivityListScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: BLUE_DARK },
          headerTintColor: '#fff',
        }}
        name="Activity"
        component={ActivityScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HouseInformation"
        component={HouseInformationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyExpedient"
        component={MyExpedientScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ReportTutorial"
        component={ReportTutorialScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.REPORT_HOME}
        component={ReportHomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={RoutesName.REPORT}
        component={ReportScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ReportSended"
        component={ReportSendedScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ReportShow"
        component={ReportShowScreen}
      />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const sessionStore = useAppSelector(itm => itm.session);

  const initApp = useCallback(async () => {
    try {
      const load = await storage.load({
        key: EStorage.login,
        autoSync: true,
        syncInBackground: true,
      });
      if (load) {
        setIsAuthenticate(true);
      }
    } catch (e) {
      const error: any = e;
      switch (error.name) {
        case 'NotFoundError':
          setIsAuthenticate(false);
          break;
        case 'ExpiredError':
          setIsAuthenticate(false);
          break;
      }
    }
  }, []);

  useFocusEffect(() => {
    initApp();
  });

  useEffect(() => {}, [sessionStore]);
  return <>{sessionStore.isLogin ? <AuthRoutes /> : <NoAuthRoutes />}</>;
};

export default AppRoutes;
