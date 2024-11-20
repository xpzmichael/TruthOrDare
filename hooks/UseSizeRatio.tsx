import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const useSizeRatio = () => {
  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const handleResize = ({ window }: { window: ScaledSize }) => {
      setWindowSize({
        width: window.width,
        height: window.height,
      });
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);


  let shortSide = windowSize.width;
  if (windowSize.width < windowSize.height) {
    shortSide = Math.min(windowSize.width, windowSize.height / 2);
  } else {
    shortSide = Math.min(windowSize.height, windowSize.width / 2);
  }
  return shortSide / 350;
};

export default useSizeRatio;
