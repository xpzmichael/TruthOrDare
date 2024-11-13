import React, { useCallback } from "react";
import QuestionButton from "./QuestionButton";
import { QuestionLibraryColors } from "@/constants/Colors";
import QuestionManager from "./QuestionManager";
import { useSettings } from "@/hooks/SettingsContext";


const TruthButton = () => {
  const { truthQuestionType } = useSettings();
  const questionManager = QuestionManager.getInstance();
  
  const handlePress = useCallback(() => {
    questionManager.popTruthQuestions(truthQuestionType);
  }, [truthQuestionType]);

  return (
    <QuestionButton color={QuestionLibraryColors.TRUTH_BUTTON} label='Truth' onPress={handlePress}/>
  )
}

export default TruthButton;