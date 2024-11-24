import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import OptionPicker from '@/components/OptionPicker';
import { useSettings } from '@/hooks/SettingsContext';
import { useTranslation } from 'react-i18next';
import { SettingsColors } from '@/constants/Colors';
import { Themes, SpinSpeeds, TruthQuestionTypes, DareHardnesses } from '@/constants/SettingsEnums';
import { ROULETTE_SPIN_SPEED, TRUTH_QUESTION_LEVEL, DARE_QUESTION_LEVEL, NUM_OF_TRUTH, NUM_OF_DARE, THEME, LANGUAGE, RESET_PLAYERS, RESET_SETTINGS } from '@/constants/TranslationKeys';
import GameInitializer from '@/components/modal/GameInitializer';

const SettingsScreen: React.FC = () => {
  const {
    language,
    setLanguage,
    spinSpeed,
    setSpinSpeed,
    truthQuestionType,
    setTruthQuestionType,
    dareHardness,
    setDareHardness,
    theme,
    setTheme,
    players,
    resetSettings,
    resetPlayers,
    numOfTruth,
    setNumOfTruth,
    numOfDare,
    setNumOfDare,
  } = useSettings();

  const { t } = useTranslation();

  return (
    <ScrollView className={`flex-1 p-5 py-7 ${theme === Themes.Dark ? 'bg-settings-container-bg-dark' : 'bg-settings-container-bg'}`}>
      <OptionPicker
        options={Object.values(SpinSpeeds)}
        selectedOption={spinSpeed}
        onSelect={setSpinSpeed}
        title={t(ROULETTE_SPIN_SPEED)}
      />
      <OptionPicker
        options={Object.values(TruthQuestionTypes)}
        selectedOption={truthQuestionType}
        onSelect={setTruthQuestionType}
        title={t(TRUTH_QUESTION_LEVEL)}
      />
      <OptionPicker
        options={Object.values(DareHardnesses)}
        selectedOption={dareHardness}
        onSelect={setDareHardness}
        title={t(DARE_QUESTION_LEVEL)}
      />
      <OptionPicker
        options={[1, 2, 3]}
        selectedOption={numOfTruth}
        onSelect={setNumOfTruth}
        title={t(NUM_OF_TRUTH)}
      />

      <OptionPicker
        options={[1, 2, 3]}
        selectedOption={numOfDare}
        onSelect={setNumOfDare}
        title={t(NUM_OF_DARE)}
      />

      <OptionPicker
        options={Object.values(Themes)}
        selectedOption={theme}
        onSelect={setTheme}
        title={t(THEME)}
      />

      <OptionPicker
        options={['English', '简体中文']}
        selectedOption={language}
        onSelect={setLanguage}
        title={t(LANGUAGE)}
      />

      <View className="mt-6 self-center w-1/2">
        <Button title={t(RESET_PLAYERS)} onPress={resetPlayers} color={SettingsColors.RESET_PLAYERS_COLOR}/>
      </View>

      <View className="mt-6 self-center w-1/2">
        <Button title={t(RESET_SETTINGS)} onPress={resetSettings} color={SettingsColors.RESET_SETTINGS_COLOR}/>
      </View>
      {players === 0 && <GameInitializer/>}
      <View className="h-20"/>
    </ScrollView>
  );
};

export default SettingsScreen;