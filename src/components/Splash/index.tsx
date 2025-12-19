import { Animated, Image, ActivityIndicator, View } from 'react-native';
import { BLUE_DARK, YELLOW } from '../../styles/colors';
import { useEffect, useRef } from 'react';
import Typography from '../typography';
import { style } from './style';
import { useAppSelector } from '../../redux';

export const Splash = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const splashStore = useAppSelector(store => store.splash);
  if (!splashStore.show) return <></>;
  return (
    <Animated.View
      style={[
        style.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Image
        source={require('../../assets/logo_dorado.webp')}
        style={{ width: 120, height: 120, marginBottom: 16 }}
      />
      <Typography.Pharagraph>
        SABINO | Creando comunidades
      </Typography.Pharagraph>
      <View style={style.loader}>
        <Typography.Description color={YELLOW}>
          {splashStore.message}
        </Typography.Description>
        <ActivityIndicator style={style.spinner} color={BLUE_DARK} />
      </View>
    </Animated.View>
  );
};
