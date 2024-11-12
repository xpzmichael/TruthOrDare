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

  return Math.min(windowSize.width, windowSize.height) / 350;
};

export default useSizeRatio;
