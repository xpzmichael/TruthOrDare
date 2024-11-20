import { OptionPickerColors } from '@/constants/Colors';
import useSizeRatio from '@/hooks/UseSizeRatio';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

type OptionPickerProps = {
  options: string[] | number[];
  selectedOption: string | number;
  onSelect: (option: any) => void;
  title?: string;
  titleColor?: string;
  optionColor?: string;
  activeOptionColor?: string;
  textColor?: string;
  activeTextColor?: string;
};

const OptionPicker: React.FC<OptionPickerProps> = ({
  options,
  selectedOption,
  onSelect,
  title = '',
  titleColor = OptionPickerColors.TITLE_COLOR,
  optionColor = OptionPickerColors.OPTION_COLOR,
  activeOptionColor = OptionPickerColors.ACTIVE_OPTION_COLOR,
  textColor = OptionPickerColors.OPTION_TEXT_COLOR,
  activeTextColor = OptionPickerColors.ACTIVE_OPTION_TEXT_COLOR,
}) => {
  const sizeRatio = useSizeRatio();
  const { t } = useTranslation();

  return (
    <View style={{
      width: '100%',
      height: 75 * sizeRatio
    }}>
      <Text className={`my-1 font-medium`} style={{
          fontSize: 16 * sizeRatio,
          color: titleColor
        }}
      >
        {title}
      </Text>
      <View className={`flex-row justify-center items-center my-1`}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            className={`px-4 py-2 m-1 rounded-lg `}
            style={{
              backgroundColor: selectedOption === option ? activeOptionColor : optionColor,
            }}
            onPress={() => onSelect(option)}
          >
            <Text
              className={`font-bold`}
              style={{
                color: selectedOption === option ? activeTextColor : textColor,
                fontSize: 14 * sizeRatio
              }}
            >
              {typeof option === 'string' ? t(option) : option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    
  );
};

export default OptionPicker;