import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import GameInitializer from '@/components/modal/GameInitializer';
import SpinnerGame from '@/components/game/SpinnerGame';
import LanguageSelector from '@/components/modal/LanguageSelector';
import { useSettings } from '@/hooks/SettingsContext';
import { useTranslation } from 'react-i18next';
import { ALERT_PLAYER_COUNT } from '@/constants/TranslationKeys';
import { Themes } from '@/constants/SettingsEnums';

export default function Index() {
  const { players, setPlayers, theme } = useSettings();
  const { t } = useTranslation();
  const [isLanguageSelected, setIsLanguageSelected] = useState<boolean>(false);

  const initializeGame = (numPlayers: string) => {
    const count = parseInt(numPlayers);
    if (isNaN(count) || count < 3) {
      alert(t(ALERT_PLAYER_COUNT));
    } else {
      setPlayers(count);
    }
  };

  const handleLanguageSelection = () => {
    setIsLanguageSelected(true);
  };

  return (
    <View className={`flex-1 p-5 justify-center items-center ${theme === Themes.Dark ? 'bg-index-bg-dark' : 'bg-index-bg'}`}>
      {!isLanguageSelected && <LanguageSelector visible={!isLanguageSelected} onOK={handleLanguageSelection} />}
      {isLanguageSelected && players === 0 && <GameInitializer visible={players === 0} onInitialize={initializeGame} />}
      {players > 1 && <SpinnerGame numElements={players} />}
    </View>
  );
}