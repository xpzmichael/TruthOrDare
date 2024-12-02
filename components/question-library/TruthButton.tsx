import React, { useCallback, useRef } from "react";
import QuestionButton from "./QuestionButton";
import { QuestionLibraryColors } from "@/constants/Colors";
import QuestionManager from "./QuestionManager";
import { useSettings } from "@/hooks/SettingsContext";
import { useTranslation } from "react-i18next";
import { TRUTH } from "@/constants/TranslationKeys";
import { DoesIncludeEasierQuestions } from "@/constants/SettingsEnums";


const TruthButton = () => {
  const { truthQuestionType, numOfTruth, includeEasierQuestions } = useSettings();
  const { t } = useTranslation();
  const questionManagerRef = useRef(QuestionManager.getInstance());
  
  const handlePress = useCallback(() => {
    // console.log(includeEasierQuestions);
    questionManagerRef.current.popTruthQuestions(truthQuestionType, numOfTruth, includeEasierQuestions === DoesIncludeEasierQuestions.Yes);
  }, [truthQuestionType, numOfTruth, includeEasierQuestions]);

  return (
    <QuestionButton color={QuestionLibraryColors.TRUTH_BUTTON} label={t(TRUTH)} onPress={handlePress}/>
  )
}

export default TruthButton;