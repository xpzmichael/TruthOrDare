import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ALERT_PLAYER_COUNT, ENTER_NUM_PLACEHOLDER, ENTER_NUM_PLAYERS, START_GAME, PLEASE_SELECT_LANGUAGE } from '@/constants/TranslationKeys';
import OptionPicker from '@/components/OptionPicker';
import { useSettings } from '@/hooks/SettingsContext';
import { ModalColors } from '@/constants/Colors';

type Props = {
  languageSelection: boolean;
}


const GameInitializer = ({languageSelection} : Props) => {
  const { setPlayers, language, setLanguage } = useSettings();
  const [numPlayers, setNumPlayers] = useState<string>('');
  const { t } = useTranslation();

  // Handle the initialization of the game with number of players
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
          {languageSelection && <>
          <Text className="text-lg mb-4">{t(PLEASE_SELECT_LANGUAGE)}</Text>
          <OptionPicker
            options={['English', '简体中文']}
            selectedOption={language}
            onSelect={setLanguage}
            optionColor={ModalColors.MODAL_OPTION_INACTIVE}
            activeOptionColor={ModalColors.MODAL_OPTION_ACTIVE}
          />
          </>}
          
          <Text className="text-lg mb-4 mt-6">{t(ENTER_NUM_PLAYERS)}</Text>
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
