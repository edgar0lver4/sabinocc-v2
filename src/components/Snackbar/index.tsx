import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux';
import { resetSnack } from '../../redux/slicer/snackbar.slicer';
import { Portal } from 'react-native-paper';
import {
  DANGER,
  DANGER_DARK,
  GREEN,
  GREEN_DARK,
  STEEL_WHITE,
} from '../../styles/colors';

const Snackbar = () => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const progress = useRef(new Animated.Value(1)).current;

  const { duration, isVisible, message, variant } = useAppSelector(
    store => store.snackbar,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      Animated.timing(progress, {
        toValue: 0,
        duration: duration * 1000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) hideSnackbar();
      });
    } else {
      hideSnackbar();
    }
  }, [isVisible]);

  const hideSnackbar = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      progress.setValue(1);
      dispatch(resetSnack());
    });
  };
  const textColor = variant === 'success' ? GREEN_DARK : STEEL_WHITE;

  const BACKGROUND = variant === 'success' ? GREEN : DANGER;

  return (
    <Portal>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: BACKGROUND, transform: [{ translateY }] },
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>{message}</Text>

        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: textColor,
                transform: [
                  {
                    scaleX: progress,
                  },
                ],
              },
            ]}
          />
        </View>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    borderEndEndRadius: 8,
    borderStartEndRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 32,
    marginBottom: 8,
    marginLeft: 16,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    borderRadius: 2,
    marginTop: 6,
  },
  progressBar: {
    height: '100%',
    width: '100%',
    transformOrigin: 'left',
  },
});

export default Snackbar;
