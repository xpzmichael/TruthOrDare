import React, { useCallback, useRef } from "react";
import QuestionButton from "./QuestionButton";
import { QuestionLibraryColors } from "@/constants/Colors";
import QuestionManager from "./QuestionManager";
import { useSettings } from "@/hooks/SettingsContext";
import { useTranslation } from "react-i18next";
import { DARE } from "@/constants/TranslationKeys";
import { DoesIncludeEasierQuestions } from "@/constants/SettingsEnums";


const DareButton = () => {
  const { dareHardness, numOfDare, includeEasierQuestions} = useSettings();
  const { t } = useTranslation();
  const questionManagerRef = useRef(QuestionManager.getInstance());
  
  const handlePress = useCallback(() => {
    questionManagerRef.current.popDareQuestions(dareHardness, numOfDare, includeEasierQuestions === DoesIncludeEasierQuestions.Yes);
  }, [dareHardness, numOfDare, includeEasierQuestions]);

  return (
    <QuestionButton color={QuestionLibraryColors.DARE_BUTTON} label={t(DARE)} onPress={handlePress}/>
  )
}

export default DareButton;