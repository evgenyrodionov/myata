import { Animated } from 'react-native';

// This defines animation behavior we expext onPressIn
export function pressInAnimation(
  animated: Animated.Value,
  duration: number = 300,
) {
  animated.setValue(0);
  Animated.timing(animated, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  }).start();
}

// This defines animatiom behavior we expect onPressOut
export function pressOutAnimation(
  animated: Animated.Value,
  duration: number = 300,
) {
  animated.setValue(1);
  Animated.timing(animated, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  }).start();
}

// this defines the terms of our scaling animation.
export function getScaleTransformationStyle(
  animated: Animated.Value,
  startSize: number = 1,
  endSize: number = 0.98,
) {
  const interpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [startSize, endSize],
  });
  return {
    transform: [{ scale: interpolation }],
  };
}
