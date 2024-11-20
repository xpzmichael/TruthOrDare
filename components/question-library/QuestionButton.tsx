import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import useSizeRatio from '@/hooks/UseSizeRatio';

type Props = {
  color: string;
  label: string;
  onPress?: () => void;
}

const QuestionButton = ({color, label, onPress = () => {}} : Props) => {
  const sizeRatio = useSizeRatio();
  return (

    <TouchableOpacity className='rounded-lg border-2 justify-center' 
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          backgroundColor: color,
          width: 140 * sizeRatio,
          height: 86.5 * sizeRatio,
          // Outer Shadow (Android and iOS)
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 5,

          // Mimicking the inset shadow using a separate layer with a darker background
          borderWidth: 1,
          borderColor: '#333', // Darker border to give a sense of depth}}>
        }}>
      <Text className={`text-xl font-bold text-white text-center`}
            style={{fontSize: 24 * sizeRatio}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionButton;
