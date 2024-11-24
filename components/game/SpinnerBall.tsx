import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SpinnerColors } from '@/constants/Colors';
import useSizeRatio from '@/hooks/UseSizeRatio';
import { useSpinnerContext } from '@/hooks/SpinnerContext';

interface SpinnerBallProps {
  index: number;
  angle: number;
}

const SpinnerBall: React.FC<SpinnerBallProps> = ({
  index,
  angle,
}) => {

  const { radius, ballWidth, locked, highlightedIndex, reset } = useSpinnerContext();

  const [ballColor, setBallColor] = useState(SpinnerColors.BALL_BACKGROUND);

  useEffect(() => {
    resetPosition();
  }, [reset]);

  useEffect(() => {
    setBallColor(
      index === highlightedIndex
        ? SpinnerColors.HIGHLIGHT
        : SpinnerColors.BALL_BACKGROUND
    );
  }, [highlightedIndex]);

  // Initial position
  const initialX = radius * Math.cos(angle);
  const initialY = radius * Math.sin(angle);

  // Shared values for position
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(1); 

  const resetPosition = useCallback(() => {
    translateX.value = initialX;
    translateY.value = initialY;
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withSpring(scale.value, {damping: 1, stiffness: 100}) },
    ],
  }));

  // Gesture definition
  const drag = useMemo(() => Gesture.Pan()
    .onBegin(() => {
      scale.value = 0.9;
    })
    .onChange((event) => {
      if (locked) return; 
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onFinalize(() => {
      scale.value = 1;
    }), [locked]);

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        className={`absolute justify-center items-center ${Platform.OS === 'ios' ? 'shadow-lg' : 'elevation-5'}`}
        style={[
          animatedStyle,
          {
            width: ballWidth,
            height: ballWidth,
            borderRadius: ballWidth / 2,
            backgroundColor: ballColor,
          },
        ]}
      >
        <Text
          className={`text-white font-bold text-[${22 * useSizeRatio()}px]`}
        >
          {index + 1}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default SpinnerBall;