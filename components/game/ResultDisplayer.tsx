import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ResultDisplayerColors } from '@/constants/Colors';
import useSizeRatio from '@/hooks/UseSizeRatio';

interface ResultDisplayerProps {
  interviewerIndex: number;
  intervieweeIndex: number;
}

const ResultDisplayer: React.FC<ResultDisplayerProps> = ({ interviewerIndex, intervieweeIndex }) => {

  const sizeRatio = useSizeRatio();
  
  return (
    <View className="flex-row items-center justify-between w-4/5 mt-5 mb-2.5">
      <View className="w-1/3 aspect-square justify-center items-center mx-2.5 bg-result-square-bg">
        <Text className="font-bold text-result-text" style={{fontSize: 32 * sizeRatio}}>{interviewerIndex}</Text>
      </View>
      <FontAwesomeIcon icon={faArrowRight} size={24 * sizeRatio} style={{ color: ResultDisplayerColors.ARROW_COLOR, width: 40, height: 40 }} />
      <View className="w-1/3 aspect-square justify-center items-center mx-2.5 bg-result-square-bg">
        <Text className="font-bold text-result-text" style={{ fontSize: 32 * sizeRatio}} >{intervieweeIndex}</Text>
      </View>
    </View>
  );
};

export default ResultDisplayer;
