import React, { useCallback, useRef } from "react";
import QuestionButton from "./QuestionButton";
import { QuestionLibraryColors } from "@/constants/Colors";
import QuestionManager from "./QuestionManager";
import { useSettings } from "@/hooks/SettingsContext";
import { useTranslation } from "react-i18next";
import { TRUTH } from "@/constants/TranslationKeys";
import { TruthQuestionType } from "@/constants/SettingsEnums";


const TruthButton = () => {
  const { truthQuestionType, numOfTruth } = useSettings();
  const { t } = useTranslation();
  const questionManagerRef = useRef(QuestionManager.getInstance());
  
  const handlePress = useCallback(() => {
    questionManagerRef.current.popTruthQuestions(truthQuestionType, numOfTruth);
  }, [truthQuestionType, numOfTruth]);

  return (
    <QuestionButton color={QuestionLibraryColors.TRUTH_BUTTON} label={t(TRUTH)} onPress={handlePress}/>
  )
}

export default TruthButton;