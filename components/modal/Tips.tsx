import React, { useState } from 'react';
import { View, ImageBackground, Modal, StyleSheet } from 'react-native';
import useSizeRatio from '@/hooks/UseSizeRatio';
import IconButton from '@/components/IconButton';
import { ModalColors } from '@/constants/Colors';
import { useSettings } from '@/hooks/SettingsContext';


interface ImageItem {
  uri: any; 
}

interface TipsProps {
  visible: boolean;
  onClose: () => void;
}

const images_en: ImageItem[] = [
  { uri: require('@/assets/images/tip1_en.png') },
  { uri: require('@/assets/images/tip2_en.png') },
  { uri: require('@/assets/images/tip3_en.png') },
];

const images_zh: ImageItem[] = [
  { uri: require('@/assets/images/tip1_zh.png') },
  { uri: require('@/assets/images/tip2_zh.png') },
  { uri: require('@/assets/images/tip3_zh.png') },
];

export const Tips: React.FC<TipsProps> = ({ visible, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sizeRatio = useSizeRatio();
  const { language } = useSettings();


  const imgWidth = 240 * sizeRatio;
  const imgHeight = imgWidth * 59 / 32;
  const images = language === 'English' ? images_en : images_zh;

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      onClose(); 
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={[styles.imageContainer, { width: imgWidth, height: imgHeight }]}>
          <ImageBackground
            style={[styles.imageBackground, { width: imgWidth, height: imgHeight }]}
            source={images[currentIndex].uri}
            resizeMode="contain"
          >
            <View style={styles.buttonContainer}>
              <IconButton
                iconName={currentIndex === images.length - 1 ? 'close-circle' : 'arrow-forward-circle'}
                onPress={handleNext}
                size={50 * sizeRatio} 
                color={ModalColors.TIPS_BUTTON_BACKGROUND}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageBackground: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 12, // Distance from the bottom
    alignSelf: 'center', 
  },
});
