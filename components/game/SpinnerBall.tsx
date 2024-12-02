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
  const { numElements, radius, ballWidth, locked, highlightedIndex, reset } = useSpinnerContext();

  const [ballColor, setBallColor] = useState(SpinnerColors.BALL_BACKGROUND);

  useEffect(() => {
    resetPosition();
  }, [reset, numElements]);

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

  // Shared values for position and width
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const width = useSharedValue(ballWidth);

  const resetPosition = useCallback(() => {
    translateX.value = withSpring(initialX);
    translateY.value = withSpring(initialY);
    width.value = withSpring(ballWidth);  // Reset width to original size
  }, [numElements]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    width: withSpring(width.value, { damping: 10, stiffness: 150 }),
    height: withSpring(width.value, { damping: 10, stiffness: 150 }), // Maintain aspect ratio
  }));

  // Gesture definition
  const drag = useMemo(() => Gesture.Pan()
    .onBegin(() => {
      width.value = ballWidth * 0.9; // Reduce width during drag
    })
    .onChange((event) => {
      if (locked) return;
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onFinalize(() => {
      width.value = ballWidth; // Restore width after drag
    }), [locked, ballWidth]);

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        className={`absolute justify-center items-center ${Platform.OS === 'ios' ? 'shadow-lg' : 'elevation-5'}`}
        style={[
          animatedStyle,
          {
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
