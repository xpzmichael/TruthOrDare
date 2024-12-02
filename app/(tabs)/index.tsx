import React, { useEffect } from 'react';

import GameInitializer from '@/components/modal/GameInitializer';
import SpinnerGame from '@/components/game/SpinnerGame';
import { useSettings } from '@/hooks/SettingsContext';
import { Themes } from '@/constants/SettingsEnums';
import { SpinnerProvider } from '@/hooks/SpinnerContext';
import { View } from 'react-native';


export default function Index() {
  const { players, theme } = useSettings();
  const [firstTime, setFirstTime] = React.useState(true);

  useEffect(() => {
    if (players > 0) {
      setFirstTime(false);
    }
  }, [players]);

  return (
    <View className={`flex-1 p-5 justify-center items-center ${theme === Themes.Dark ? 'bg-index-bg-dark' : 'bg-index-bg'}`}>
      {players === 0 && firstTime && <GameInitializer languageSelection={firstTime} />}
      <SpinnerProvider>
        {players > 1 && <SpinnerGame numElements={players} />}
      </SpinnerProvider>
    </View>
  );
}