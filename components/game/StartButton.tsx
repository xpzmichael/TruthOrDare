import { StartButtonColors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface StartButtonProps {
  isSpinning: boolean;
  onPress: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ isSpinning, onPress }) => {
  return (
    <TouchableOpacity
      className="flex items-center mt-5 mb-2 rounded-md bg-start-button-bg"
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
      onPress={onPress}
      disabled={isSpinning}
    >
      <Text
        className="font-bold text-start-button-text"
        style={{
          fontSize: 16,
        }}
      >
        {isSpinning ? 'Spinning...' : 'Start'}
      </Text>
    </TouchableOpacity>
  );
};

export default StartButton;