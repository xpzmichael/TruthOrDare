import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import ResultDisplayer from './ResultDisplayer';
import Spinner from './Spinner';
import StartButton from './StartButton';
import { useSettings } from '@/hooks/SettingsContext';
import useSizeRatio from '@/hooks/UseSizeRatio';
import { getSpinnerDelay } from '../../utils/GetSpinnerSpeed';
import { useSpinnerContext } from '@/hooks/SpinnerContext';
import TopButtons from './TopButtons';
import { Tips } from '../modal/Tips';

interface SpinnerGameProps {
  numElements: number;
}

const SpinnerGame: React.FC<SpinnerGameProps> = ({ numElements }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const { highlightedIndex, circleContainerWidth, showTips, setHighlightedIndex, setBallWidth, setCircleContainerWidth,
    setCircleContainerBorderWidth, setRadius, setNumElements, setShowTips } = useSpinnerContext();

  const lastRoundIndexRef = useRef<number>(highlightedIndex);
  const { spinSpeed } = useSettings();
  const sizeRatio = useSizeRatio();

  const initialDelay = getSpinnerDelay(spinSpeed);

  useEffect(() => {
    const ballRadius: number = (15 + 75 / numElements) * sizeRatio;
    const spinnerCircleRadius: number = (160 - ballRadius) * sizeRatio;
    const circleContainerBorderWidth: number = 1;
    const circleContainerWidth: number =
      spinnerCircleRadius * 2 + ballRadius * 2 + circleContainerBorderWidth * 2;

    setNumElements(numElements);
    setBallWidth(ballRadius * 2);
    setRadius(spinnerCircleRadius);
    setCircleContainerWidth(circleContainerWidth);
    setCircleContainerBorderWidth(circleContainerBorderWidth);
  }, [numElements, sizeRatio]);


  useEffect(() => {
    if (!isSpinning) return;

    let timeout: NodeJS.Timeout;
    let delay = initialDelay;
    const delayIncrement = 1 + 0.8 / numElements;
    let numIterations = Math.random() * (numElements - 1) + (numElements - 1) * 2;

    const spin = () => {
      setHighlightedIndex((prevIndex: number) => {
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
    <View className="flex justify-center items-center pb-12" style={{ width: circleContainerWidth }}>
      {showTips && <Tips visible={true} onClose={() => { setShowTips(false) }} />}
      <TopButtons />
      <Spinner />
      <View className='flex justify-center -z-10 items-center border border-black' style={{ width: circleContainerWidth }}>
        <ResultDisplayer interviewerIndex={lastRoundIndexRef.current + 1} intervieweeIndex={highlightedIndex + 1} />
        <StartButton isSpinning={isSpinning} onPress={startSpinning} />
      </View>
    </View>
  );
};


export default SpinnerGame;