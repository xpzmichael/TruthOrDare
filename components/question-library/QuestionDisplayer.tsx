import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ChatBubble from "@/components/question-library/ChatBubble";
import QuestionManager from "./QuestionManager";

const QuestionDisplayer: React.FC = () => {
  const questionManager = QuestionManager.getInstance();
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    questionManager.subscribe(setQuestions);
  }, []);

  if (questions.length === 0) {
    const placeholder = 'Press "Truth" or "Dare" to get a question!';
    setQuestions([placeholder]);
  }

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