import React, { useState, useEffect } from 'react';

import GameInitializer from '@/components/modal/GameInitializer';
import SpinnerGame from '@/components/game/SpinnerGame';
import LanguageSelector from '@/components/modal/LanguageSelector';
import { useSettings } from '@/hooks/SettingsContext';
import { Themes } from '@/constants/SettingsEnums';
import { SpinnerProvider } from '@/hooks/SpinnerContext';
import { View } from 'react-native';

export default function Index() {
  const { players, theme } = useSettings();
  const [isLanguageSelected, setIsLanguageSelected] = useState<boolean>(false);


  const handleLanguageSelection = () => {
    setIsLanguageSelected(true);
  };

  return (
    <View className={`flex-1 p-5 justify-center items-center ${theme === Themes.Dark ? 'bg-index-bg-dark' : 'bg-index-bg'}`}>
      {!isLanguageSelected && <LanguageSelector visible={!isLanguageSelected} onOK={handleLanguageSelection} />}
      {isLanguageSelected && players === 0 && <GameInitializer/>}
      <SpinnerProvider>
        {players > 1 && <SpinnerGame numElements={players} />}
      </SpinnerProvider>
    </View>
  );
}