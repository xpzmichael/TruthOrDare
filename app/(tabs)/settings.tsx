import React from 'react';
import { View, Text, Button } from 'react-native';
import OptionPicker from '@/components/settings/OptionPicker';
import { useSettings } from '@/hooks/SettingsContext';
import { SettingsColors } from '@/constants/Colors';
import { SpinSpeed, TruthQuestionType, DareHardness, Theme } from '@/constants/SettingsEnums';

const SettingsScreen: React.FC = () => {
  const {
    spinSpeed,
    setSpinSpeed,
    truthQuestionType,
    setTruthQuestionType,
    dareHardness,
    setDareHardness,
    theme,
    setTheme,
    resetSettings,
    resetPlayers
  } = useSettings();

  return (
    <View className={`flex-1 p-5 ${theme === Theme.Dark ? 'bg-settings-container-bg-dark' : 'bg-settings-container-bg'}`}>
      <Text className="text-2xl font-bold mb-5 text-center text-settings-title">Settings</Text>

      <Text className="text-lg font-medium mt-3 mb-2 text-settings-label">Spin Speed</Text>
      <OptionPicker
        options={Object.values(SpinSpeed)}
        selectedOption={spinSpeed}
        onSelect={setSpinSpeed}
      />

      <Text className="text-lg font-medium mt-3 mb-2 text-settings-label">Truth Question Type</Text>
      <OptionPicker
        options={Object.values(TruthQuestionType)}
        selectedOption={truthQuestionType}
        onSelect={setTruthQuestionType}
      />

      <Text className="text-lg font-medium mt-3 mb-2 text-settings-label">Dare Hardness</Text>
      <OptionPicker
        options={Object.values(DareHardness)}
        selectedOption={dareHardness}
        onSelect={setDareHardness}
      />

      <Text className="text-lg font-medium mt-3 mb-2 text-settings-label">Theme</Text>
      <OptionPicker
        options={Object.values(Theme)}
        selectedOption={theme}
        onSelect={setTheme}
      />

      <View className="mt-6 self-center w-1/2">
        <Button title="Reset Players" onPress={resetPlayers} color={SettingsColors.RESET_PLAYERS_COLOR}/>
      </View>

      <View className="mt-6 self-center w-1/2 bg-reset-players">
        <Button title="Reset Settings" onPress={resetSettings} color={SettingsColors.RESET_SETTINGS_COLOR}/>
      </View>
    </View>
  );
};

export default SettingsScreen;