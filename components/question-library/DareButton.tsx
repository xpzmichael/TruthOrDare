import React, { useCallback, useRef } from "react";
import QuestionButton from "./QuestionButton";
import { QuestionLibraryColors } from "@/constants/Colors";
import QuestionManager from "./QuestionManager";
import { useSettings } from "@/hooks/SettingsContext";
import { useTranslation } from "react-i18next";
import { DARE } from "@/constants/TranslationKeys";


const DareButton = () => {
  const { dareHardness, numOfDare } = useSettings();
  const { t } = useTranslation();
  const questionManagerRef = useRef(QuestionManager.getInstance());
  
  const handlePress = useCallback(() => {
    questionManagerRef.current.popDareQuestions(dareHardness, numOfDare);
  }, [dareHardness, numOfDare]);

  return (
    <QuestionButton color={QuestionLibraryColors.DARE_BUTTON} label={t(DARE)} onPress={handlePress}/>
  )
}

export default DareButton;