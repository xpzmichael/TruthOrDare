import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import ChatBubble from "@/components/question-library/ChatBubble";
import QuestionManager from "./QuestionManager";
import { useTranslation } from "react-i18next";
import { QUESTION_PLACEHOLDER } from "@/constants/TranslationKeys";

const QuestionDisplayer: React.FC = () => {
  const questionManagerRef = useRef(QuestionManager.getInstance());
  const [questions, setQuestions] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    questionManagerRef.current.subscribe(setQuestions);
  }, []);

  useEffect(() => {
    console.log("Language changed, resetting questions");
    setQuestions([t(QUESTION_PLACEHOLDER)]);
  }, [t]);


  return (
    <View className="w-full h-2/3 pt-8 flex-col justify-between items-center">
      {questions.map((question, index) => (
        <View key={index} className="w-4/5 h-1/3 transform transition-transform duration-300 hover:scale-105">
          <ChatBubble content={question} />
        </View>
      ))}
    </View>
  );
};

export default QuestionDisplayer;