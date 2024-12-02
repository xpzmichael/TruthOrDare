import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpinSpeed, TruthQuestionType, DareHardness, Theme, SpinSpeeds, TruthQuestionTypes, DareHardnesses, Themes, IncludeEasierQuestions, DoesIncludeEasierQuestions } from '@/constants/SettingsEnums';
import i18n from '@/locales/i18n';
import { getLanguageSetting } from '@/utils/LanguageUtils';
import QuestionManager from '@/components/question-library/QuestionManager';

type Settings = {
  language: string;
  spinSpeed: SpinSpeed;
  truthQuestionType: TruthQuestionType;
  dareHardness: DareHardness;
  theme: Theme;
  includeEasierQuestions: IncludeEasierQuestions;
  setIncludeEasierQuestions: (includeEasierQuestions: IncludeEasierQuestions) => void;
  setLanguage: (language: string) => void;
  setSpinSpeed: (speed: SpinSpeed) => void;
  setTruthQuestionType: (type: TruthQuestionType) => void;
  setDareHardness: (hardness: DareHardness) => void;
  setTheme: (theme: Theme) => void;
  resetSettings: () => void;
  players: number;
  setPlayers: (count: number) => void;
  resetPlayers: () => void;
  numOfTruth: number;
  setNumOfTruth: (numOfThuth: number) => void;
  numOfDare: number;
  setNumOfDare: (numOfThuth: number) => void;
};

const SettingsContext = createContext<Settings | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('English');
  const [players, setPlayers] = useState<number>(0);
  const [spinSpeed, setSpinSpeed] = useState<SpinSpeed>(SpinSpeeds.Normal);
  const [truthQuestionType, setTruthQuestionType] = useState<TruthQuestionType>(TruthQuestionTypes.Medium);
  const [dareHardness, setDareHardness] = useState<DareHardness>(DareHardnesses.Medium);
  const [theme, setTheme] = useState<Theme>(Themes.Light);
  const [numOfTruth, setNumOfTruth] = useState<number>(3);
  const [numOfDare, setNumOfDare] = useState<number>(2);
  const [includeEasierQuestions, setIncludeEasierQuestions] = useState<IncludeEasierQuestions>(DoesIncludeEasierQuestions.Yes);

  useEffect(() => {
    const varLan = getLanguageSetting(language);
    i18n.changeLanguage(varLan);
    QuestionManager.getInstance().initializeQuestions(varLan);
  }, [language]);

  const resetSettings = () => {
    setSpinSpeed(SpinSpeeds.Normal);
    setTruthQuestionType(TruthQuestionTypes.Medium);
    setDareHardness(DareHardnesses.Medium);
    setTheme(Themes.Light);
    setNumOfTruth(3);
    setNumOfDare(3);
  };

  const resetPlayers = () => {
    setPlayers(0);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        spinSpeed,
        truthQuestionType,
        dareHardness,
        theme,
        includeEasierQuestions,
        setIncludeEasierQuestions,
        setLanguage,
        setSpinSpeed,
        setTruthQuestionType,
        setDareHardness,
        setTheme,
        resetSettings,
        players,
        setPlayers,
        resetPlayers,
        numOfTruth,
        setNumOfTruth,
        numOfDare,
        setNumOfDare,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): Settings => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
