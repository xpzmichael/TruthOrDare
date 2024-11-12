import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useSettings } from '@/hooks/SettingsContext';
import QuestionButton from '@/components/question-library/QuestionButton';
import { QuestionLibraryColors } from '@/constants/Colors';
import ChatBubble from '@/components/question-library/ChatBubble';
import useSizeRatio from '@/hooks/UseSizeRatio';
import QuestionDisplayer from '@/components/question-library/QuestionDisplayer';

export default function LibraryScreen() {
  return (
    <View className='relative flex-1'>
      <QuestionDisplayer />
      <View className='absolute px-6 w-full flex-row justify-between bottom-10'>
        <QuestionButton color={QuestionLibraryColors.TRUTH_BUTTON} label='Truth' />
        <QuestionButton color={QuestionLibraryColors.DARE_BUTTON} label='Dare' />
      </View>
    </View>
  );
}