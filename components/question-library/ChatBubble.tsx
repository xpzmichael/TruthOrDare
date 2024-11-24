import React, { useCallback, useMemo, useState } from 'react';
import { View, LayoutChangeEvent, StyleSheet } from 'react-native';
import Svg, { Path, Text, TSpan } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ChatBubbleColors } from '@/constants/Colors';
import { useSettings } from '@/hooks/SettingsContext';
import { splitEnglishIntoLines, splitChineseIntoLines } from '@/utils/TextUtils';
import useSizeRatio from '@/hooks/UseSizeRatio';

interface ChatBubbleProps {
  content: string;
  blurred?: boolean;
  selected?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content, blurred, selected }) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const sizeRatio = useSizeRatio();
  const { language } = useSettings();

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setAspectRatio(width / height);
  };

  const getScale = useCallback(() => {
    if (selected) {
      return 1.1;
    }
    if (blurred) {
      return 0.8;
    }
    return 1;
  }, [selected, blurred]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(getScale(), { damping: 12, stiffness: 150 }) }
    ],
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
    <Animated.View style={[{ flex: 1 }, animatedStyle]} onLayout={onLayout}>
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
          x="50%"
          y="10%"
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
  );
};

export default ChatBubble;
