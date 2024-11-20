import { StartButtonColors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import useSizeRatio from '@/hooks/UseSizeRatio';
import { SPINNING, START } from '@/constants/TranslationKeys';


interface StartButtonProps {
  isSpinning: boolean;
  onPress: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ isSpinning, onPress }) => {
  const { t } = useTranslation();
  const sizeRatio = useSizeRatio();
  return (
    <TouchableOpacity
      className="flex items-center mt-5 mb-2 rounded-md bg-start-button-bg"
      style={{
        paddingVertical: 10 * sizeRatio,
        paddingHorizontal: 20 * sizeRatio,
      }}
      onPress={onPress}
      disabled={isSpinning}
    >
      <Text
        className="font-bold text-start-button-text"
        style={{
          fontSize: 16 * sizeRatio,
        }}
      >
        {isSpinning ? t(SPINNING) : t(START)}
      </Text>
    </TouchableOpacity>
  );
};

export default StartButton;
