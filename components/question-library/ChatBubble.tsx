import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Text, TSpan } from 'react-native-svg';
import { ChatBubbleColors } from '@/constants/Colors';
import useSizeRatio from '@/hooks/UseSizeRatio';

interface ChatBubbleProps {
  content: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setAspectRatio(width / height);
  };

  const getPath = () => {
    const width = 100 * aspectRatio;
    return `m 20 10 l ${width - 40} 0 a 10 10 0 0 1 10 10 l 0 50 a 10 10 0 0 1 -10 10 l -${width - 55} 0 l -20 10 l 5 -10 a 10 10 0 0 1 -10 -10 l 0 -50 a 10 10 0 0 1 10 -10`;
  };

  const fontSize = 10;

  const splitTextIntoLines = (text: string, maxWidth: number, charWidth: number) => {
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < text.length; i++) {
        const testLine = currentLine + text[i];
        if (testLine.length * charWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = text[i];
        } else {
            currentLine = testLine;
        }
    }

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
  }; 

  const lines = splitTextIntoLines(content, 100 * aspectRatio - 40, fontSize);

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${100 * aspectRatio} 100`}>
        {/* Draw the chat bubble */}
        <Path
          d={getPath()}
          fill={ChatBubbleColors.BUBBLE_FILL}
          stroke={ChatBubbleColors.BUBBLE_STROKE}
          strokeWidth="2"
        />
        {/* Add text inside the chat bubble */}
        <Text
          x="50%"
          y="10%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={ChatBubbleColors.TEXT_FILL}
        >
          {lines.map((line, index) => (
            <TSpan key={index} x="50%" dy={14} fontSize={fontSize}>
              {line}
            </TSpan>
          ))}
        </Text>
      </Svg>
    </View>
  );
};

export default ChatBubble;