import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import {  PLEASE_SELECT_LANGUAGE } from '@/constants/TranslationKeys';
import OptionPicker from '@/components/OptionPicker';
import { useSettings } from '@/hooks/SettingsContext';
import { ModalColors } from '@/constants/Colors';

type Props = {
  visible: boolean;
  onOK: () => void;
}

const LanguageSelector = ({ visible, onOK }: Props) => {
  const { language, setLanguage } = useSettings();
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center bg-[rgba(0,0,0,0.5)]">
        <View className="m-5 bg-white rounded-lg p-9 items-center elevation-5">
          <OptionPicker
            options={['English', '简体中文']}
            selectedOption={language}
            onSelect={setLanguage}
            title={t(PLEASE_SELECT_LANGUAGE)}
            optionColor={ModalColors.MODAL_OPTION_INACTIVE}
            activeOptionColor={ModalColors.MODAL_OPTION_ACTIVE}
          />
          <TouchableOpacity
            className="mt-5 py-1 px-5 rounded"
            style={{ backgroundColor: ModalColors.BUTTON_BACKGROUND }}
            onPress={onOK}
          >
            <Text
              className="text-white text-lg"
              style={{ color: ModalColors.BUTTON_TEXT }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageSelector;