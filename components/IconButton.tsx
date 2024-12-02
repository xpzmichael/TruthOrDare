import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, onPress, size = 30, color = 'black' }) => {
  return (
    <TouchableOpacity onPress={onPress} className='h-full w-auto p-1'>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

