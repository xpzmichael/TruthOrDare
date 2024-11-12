import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ResultDisplayer from './ResultDisplayer';
import Spinner from './Spinner';
import StartButton from './StartButton';
import { useSettings } from '@/hooks/SettingsContext';
import useSizeRatio from '@/hooks/UseSizeRatio';
import { getSpinnerDelay } from './GetSpinnerSpeed';

interface SpinnerGameProps {
  numElements: number;
}

const SpinnerGame: React.FC<SpinnerGameProps> = ({ numElements }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const lastRoundIndexRef = useRef<number>(highlightedIndex);
  const { spinSpeed } = useSettings();

  let initialDelay: number;

  initialDelay = getSpinnerDelay(spinSpeed);

  const sizeRatio = useSizeRatio();

  const ballRadius: number = (15 + 75 / numElements) * sizeRatio;
  const spinnerCircleRadius: number = (160 - ballRadius) * sizeRatio;
  const circleContainerBorderWidth: number = 1;
  const circleContainerWidth: number =
    spinnerCircleRadius * 2 + ballRadius * 2 + circleContainerBorderWidth * 2;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let delay = initialDelay;
    const delayIncrement = 1 + 0.8 / numElements;
    let numIterations = Math.random() * (numElements - 1) + numElements * 2;

    if (isSpinning) {
      const spin = () => {
        setHighlightedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % numElements;

          if (newIndex !== lastRoundIndexRef.current) {
            numIterations -= 1;
          }

          if (numIterations <= 0) {
            setIsSpinning(false);
            return newIndex;
          }

          delay *= delayIncrement;
          timeout = setTimeout(spin, delay);
          return newIndex;
        });
      };

      timeout = setTimeout(spin, delay);
    }

    lastRoundIndexRef.current = highlightedIndex;

    return () => {
      clearTimeout(timeout);
    };
  }, [isSpinning, numElements]);

  const startSpinning = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }
  };

  return (
    <View className="border border-black flex justify-center items-center mt-1" style={{ width: circleContainerWidth }}>
      <Spinner
        numElements={numElements}
        highlightedIndex={highlightedIndex}
        ballWidth={ballRadius * 2}
        spinnerCircleRadius={spinnerCircleRadius}
        circleContainerBorderWidth={circleContainerBorderWidth}
        circleContainerWidth={circleContainerWidth}
      />
      <ResultDisplayer interviewerIndex={lastRoundIndexRef.current + 1} intervieweeIndex={highlightedIndex + 1} />
      <StartButton isSpinning={isSpinning} onPress={startSpinning} />
    </View>
  );
};


export default SpinnerGame;