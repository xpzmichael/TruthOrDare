import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Svg, { Path, Text, TSpan } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ChatBubbleColors } from '@/constants/Colors';
import { useSettings } from '@/hooks/SettingsContext';
import { splitEnglishIntoLines, splitChineseIntoLines } from '@/utils/TextUtils';
import useSizeRatio from '@/hooks/UseSizeRatio';

interface ChatBubbleProps {
  content: string;
  blurred: boolean;
  selected: boolean;
  chatWidth: number;
  chatHeight: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content, blurred, selected, chatWidth, chatHeight }) => {
  const sizeRatio = useSizeRatio();
  const aspectRatio = chatHeight !== 0 ? chatWidth / chatHeight : 1;
  const { language } = useSettings();
  const sharedWidth = useSharedValue(1); 

  useEffect(() => {
    const newWidth = getWidth();
    sharedWidth.value = newWidth; 
  }, [selected, blurred, chatWidth]);


  const getWidth = useCallback(() => {
    if (selected) {
      return 1 * chatWidth;  // Increase width when selected
    }
    if (blurred) {
      return 0.7 * chatWidth;   // Decrease width when blurred
    }
    return 0.9 * chatWidth;     // Default width
  }, [selected, blurred, chatWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(sharedWidth.value, { damping: 13, stiffness: 150 }),
    height: withSpring(sharedWidth.value / aspectRatio, { damping: 13, stiffness: 150 }),
  }));

  const getPath = () => {
    const width = 100 * aspectRatio;
    return `m 20 10 l ${width - 40} 0 a 10 10 0 0 1 10 10 l 0 50 a 10 10 0 0 1 -10 10 l -${width - 55} 0 l -20 10 l 5 -10 a 10 10 0 0 1 -10 -10 l 0 -50 a 10 10 0 0 1 10 -10`;
  };

  const fontSize = 9 * sizeRatio;

  const splitTextIntoLines = useCallback(
    (text: string, maxWidth: number, charWidth: number) => {
      if (language === 'English') {
        return splitEnglishIntoLines(text, maxWidth, charWidth);
      }
      return splitChineseIntoLines(text, maxWidth, charWidth);
    },
    [language]
  );

  const lines = useMemo(() => 
    splitTextIntoLines(content, 100 * aspectRatio - 40, fontSize)
    , [content, aspectRatio]);

  return (
    <View className='w-full h-full flex items-center justify-center'>
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <Svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${100 * (isNaN(aspectRatio) ? 1 : aspectRatio)} 100`}
      >
        <Path
          d={getPath()}
          fill={ChatBubbleColors.BUBBLE_FILL}
          stroke={ChatBubbleColors.BUBBLE_STROKE}
          strokeWidth="2"
        />
        <Text
          x="50"
          y="10"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={ChatBubbleColors.TEXT_FILL}
        >
          {!blurred && lines.map((line, index) => (
            <TSpan key={index} x="50%" dy={14} fontSize={fontSize}>
              {line}
            </TSpan>
          ))}
        </Text>
      </Svg>
    </Animated.View>
    </View>
  );
};

export default ChatBubble;
