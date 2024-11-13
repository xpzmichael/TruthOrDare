import React, { useCallback } from "react";
import QuestionButton from "./QuestionButton";
import { QuestionLibraryColors } from "@/constants/Colors";
import QuestionManager from "./QuestionManager";
import { useSettings } from "@/hooks/SettingsContext";


const DareButton = () => {
  const { dareHardness } = useSettings();
  const questionManager = QuestionManager.getInstance();
  
  const handlePress = useCallback(() => {
    questionManager.popDareQuestions(dareHardness);
  }, [dareHardness]);

  return (
    <QuestionButton color={QuestionLibraryColors.DARE_BUTTON} label='Dare' onPress={handlePress}/>
  )
}

export default DareButton;