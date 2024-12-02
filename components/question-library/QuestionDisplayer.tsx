import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import ChatBubble from "@/components/question-library/ChatBubble";
import QuestionManager from "./QuestionManager";
import { useTranslation } from "react-i18next";
import { QUESTION_PLACEHOLDER } from "@/constants/TranslationKeys";
import { TapGestureHandler } from "react-native-gesture-handler";

const QuestionDisplayer: React.FC = () => {
  const questionManagerRef = useRef(QuestionManager.getInstance());
  const [questions, setQuestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const [chatDimensions, setChatDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    questionManagerRef.current.subscribe(setQuestions);
  }, []);

  useEffect(() => {
    setQuestions([t(QUESTION_PLACEHOLDER)]);
  }, [t]);

  useEffect(() => {
    setSelected(-1);
  }, [questions]);

  const handleTap = (index: number) => {
    if (selected >= 0) {
      setSelected(-1);
      return;
    }
    setSelected(index);
  };

  const handleOutsideTap = () => {
    setSelected(-1);
  };

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setChatDimensions({ width, height });
  };

  return (
    <TapGestureHandler onEnded={handleOutsideTap}>
      <View className="w-full h-2/3 pt-8 flex-col justify-between items-center">
        {questions.map((question, index) => (
          <TapGestureHandler key={index} onEnded={() => handleTap(index)}>
            <View className="w-5/6 h-1/3" onLayout={handleLayout}>
              <ChatBubble 
                content={question} 
                blurred={selected >= 0 && index !== selected} 
                selected={index === selected}
                chatWidth={chatDimensions.width}
                chatHeight={chatDimensions.height}
                />
            </View>
          </TapGestureHandler>
        ))}
      </View>
    </TapGestureHandler>
  );
};

export default QuestionDisplayer;