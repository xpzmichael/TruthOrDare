import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import GameInitializer from '@/components/game/GameInitializer';
import SpinnerGame from '@/components/game/SpinnerGame';
import { useSettings } from '@/hooks/SettingsContext';
import { Theme } from '@/constants/SettingsEnums';

export default function Index() {
  const { players, setPlayers, theme } = useSettings();

  const initializeGame = (numPlayers: string) => {
    const count = parseInt(numPlayers);
    if (count >= 3) {
      setPlayers(count);
    } else {
      alert("At least 3 players are required for the game.");
    }
  };

  return (
    <View className={`flex-1 p-5 justify-center items-center ${theme === Theme.Dark ? 'bg-index-bg-dark' : 'bg-index-bg'}`}>
      <GameInitializer visible={players === 0} onInitialize={initializeGame} />

      {players > 1 && <SpinnerGame numElements={players} />}
    </View>
  );
}