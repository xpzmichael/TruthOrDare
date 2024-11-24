import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ALERT_PLAYER_COUNT, ENTER_NUM_PLACEHOLDER, ENTER_NUM_PLAYERS, START_GAME } from '@/constants/TranslationKeys';
import { useSettings } from '@/hooks/SettingsContext';
import { ModalColors } from '@/constants/Colors';


const GameInitializer = () => {
  const { setPlayers } = useSettings();
  const [numPlayers, setNumPlayers] = useState<string>('');
  const { t } = useTranslation();


  const initializeGame = useCallback((numPlayers: string) => {
    const count = parseInt(numPlayers);
    if (isNaN(count) || count < 3 || count > 20) {
      Alert.alert(t(ALERT_PLAYER_COUNT));
    } else {
      setPlayers(count);
    }
  }, [t]);

  const handleStartGame = () => {
    initializeGame(numPlayers);
  };

  return (
    <Modal
      transparent={true}
      animationType="none"
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center bg-[rgba(0,0,0,0.5)]">
        <View className="m-5 bg-white rounded-lg p-9 items-center elevation-5">
          <Text className="text-lg mb-4">{t(ENTER_NUM_PLAYERS)}</Text>
          <TextInput
            className="border w-full p-2 my-2 rounded text-center"
            keyboardType="number-pad"
            value={numPlayers}
            onChangeText={setNumPlayers}
            placeholder={t(ENTER_NUM_PLACEHOLDER)}
          />
          <TouchableOpacity
            className="mt-5 py-1 px-5 rounded"
            style={{ backgroundColor: ModalColors.BUTTON_BACKGROUND }}
            onPress={handleStartGame}
          >
            <Text
              className="text-white text-lg"
              style={{ color: ModalColors.BUTTON_TEXT }}
            >
              {t(START_GAME)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GameInitializer;