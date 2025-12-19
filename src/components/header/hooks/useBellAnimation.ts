import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { useNotifications } from '../../../hooks/notification/useNotifications';

export const useBellAnimation = () => {
  const [isWhithNotifications, setIsWithNotifications] = useState(true);
  const { withNotifications } = useNotifications();
  const bellAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsWithNotifications(withNotifications);
  }, [withNotifications]);

  useEffect(() => {
    if (isWhithNotifications) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bellAnimated, {
            toValue: 1,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bellAnimated, {
            toValue: -1,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bellAnimated, {
            toValue: 0,
            duration: 150,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(5000),
        ]),
      ).start();
    } else {
      if (bellAnimated) {
        bellAnimated.stopAnimation();
      }
    }

    return () => {
      if (bellAnimated) {
        bellAnimated.stopAnimation();
      }
    };
  }, [bellAnimated]);

  const rotationZ = bellAnimated.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  return {
    rotationZ,
  };
};
