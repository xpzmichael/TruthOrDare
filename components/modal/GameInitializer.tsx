import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ENTER_NUM_PLAYERS } from '@/constants/TranslationKeys';

type Props = {
  visible: boolean;
  onInitialize: (numPlayers: string) => void;
}

const GameInitializer = ({ visible, onInitialize} : Props) => {
  const [numPlayers, setNumPlayers] = useState<string>('');
  const { t } = useTranslation();

  const handleStartGame = () => {
    onInitialize(numPlayers);
  };

  return (
    <Modal
      visible={visible}
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
            placeholder="Enter number"
          />
          <Button title="Start Game" onPress={handleStartGame} />
        </View>
      </View>
    </Modal>
  );
};

export default GameInitializer;