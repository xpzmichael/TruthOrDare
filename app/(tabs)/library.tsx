import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import QuestionDisplayer from '@/components/question-library/QuestionDisplayer';
import TruthButton from '@/components/question-library/TruthButton';
import DareButton from '@/components/question-library/DareButton';
import { useSettings } from '@/hooks/SettingsContext';
import { Theme } from '@/constants/SettingsEnums';



export default function LibraryScreen() {
  const {theme} = useSettings();
  return (
    <View className={`relative flex-1 ${theme==Theme.Dark ? 'bg-library-bg-dark':'bg-library-bg'}`}>
      <QuestionDisplayer />
      <View className='absolute px-6 w-full flex-row justify-between bottom-10'>
        <TruthButton/>
        <DareButton/>
      </View>
    </View>
  );
}