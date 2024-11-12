import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ChatBubble from "@/components/question-library/ChatBubble";
import { useSettings } from "@/hooks/SettingsContext";
import QuestionManager from "./QuestionManager";

const QuestionDisplayer: React.FC = () => {
  const { truthQuestionType } = useSettings();
  const questionManager = QuestionManager.getInstance();
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    questionManager.updateQuestions(truthQuestionType);
    setQuestions(questionManager.getQuestions());
  }, [truthQuestionType]);

  return (
    <View className="w-full h-2/3 pt-8 flex-col justify-between items-center">
      {questions.map((question, index) => (
        <View key={index} className="w-4/5 h-1/3">
          <ChatBubble content={question} />
        </View>
      ))}
    </View>
  );
};

export default QuestionDisplayer;