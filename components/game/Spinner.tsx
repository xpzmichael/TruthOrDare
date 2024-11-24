import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SpinnerBall from './SpinnerBall';
import { useSpinnerContext } from '@/hooks/SpinnerContext';

const Spinner = ( ) => {
  const { numElements, reset,
    circleContainerWidth, circleContainerBorderWidth } = useSpinnerContext();
  
  useEffect(() => {
    renderElements();
  }, [reset, numElements]);
  
  const renderElements = () => {
    const angleStep = (2 * Math.PI) / numElements;

    return Array.from({ length: numElements }).map((_, index) => {
      const angle = index * angleStep;

      return (
        <SpinnerBall
          key={index}
          index={index}
          angle={angle}
        />
      );
    });
  };

  return (
    <View
      className={`flex border-black justify-center items-center`}
      style={{
        width: circleContainerWidth,
        height: circleContainerWidth,
        borderWidth: circleContainerBorderWidth,
      }}
    >
      {renderElements()}
    </View>
  );
};

export default Spinner;