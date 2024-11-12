import { OptionPickerColors } from '@/constants/Colors';
import useSizeRatio from '@/hooks/UseSizeRatio';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type OptionPickerProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: any) => void;
  optionColor?: string;
  activeOptionColor?: string;
  textColor?: string;
  activeTextColor?: string;
};

const OptionPicker: React.FC<OptionPickerProps> = ({
  options,
  selectedOption,
  onSelect,
  optionColor = OptionPickerColors.OPTION_COLOR,
  activeOptionColor = OptionPickerColors.ACTIVE_OPTION_COLOR,
  textColor = OptionPickerColors.OPTION_TEXT_COLOR,
  activeTextColor = OptionPickerColors.ACTIVE_OPTION_TEXT_COLOR,
}) => {
  const sizeRatio = useSizeRatio();

  return (
    <View className={`flex-row justify-center items-center my-1`}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          className={`px-4 py-2 m-1 rounded-lg ${selectedOption === option ? 'bg-active-option-bg' : 'bg-option-bg'}`}
          onPress={() => onSelect(option)}
        >
          <Text
            className={`font-bold ${selectedOption === option ? 'text-active-option-text' : 'text-option-text'}`}
            style={{fontSize: 14 * sizeRatio}}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionPicker;