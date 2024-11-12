import { SpinnerColors } from '@/constants/Colors';
import useSizeRatio from '@/hooks/UseSizeRatio';
import React from 'react';
import { View, Text, Platform } from 'react-native';

interface SpinnerProps {
  numElements: number;
  highlightedIndex: number;
  ballWidth: number;
  spinnerCircleRadius: number;
  circleContainerBorderWidth: number;
  circleContainerWidth: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  numElements,
  highlightedIndex,
  ballWidth,
  spinnerCircleRadius,
  circleContainerBorderWidth,
  circleContainerWidth,
}) => {

  const renderElements = () => {
    const radius = spinnerCircleRadius;
    const angleStep = (2 * Math.PI) / numElements;

    return Array.from({ length: numElements }).map((_, index) => {
      const angle = index * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Apply dynamic styles
      const ballColor = index === highlightedIndex
        ? SpinnerColors.HIGHLIGHT
        : SpinnerColors.BALL_BACKGROUND;

      return (
        <View
          key={index}
          className={`absolute justify-center items-center ${Platform.OS === 'ios' ? 'shadow-lg' : 'elevation-5'}`}
          style={{
            top: y + radius,
            left: x + radius,
            width: ballWidth,
            height: ballWidth,
            borderRadius: ballWidth / 2,
            backgroundColor: ballColor,
          }}
        >
          <Text
            className={`text-white font-bold text-[${22 * useSizeRatio()}px]`}
          >
            {index + 1}
          </Text>
        </View>
      );
    });
  };

  return (
    <View
      className={`flex justify-center items-center`}
      style={{
        width: circleContainerWidth,
        height: circleContainerWidth,
        borderWidth: circleContainerBorderWidth,
        borderColor: 'black',
      }}
    >
      {renderElements()}
    </View>
  );
};

export default Spinner;
